package com.js.mcpapi.service;

import com.js.mcpapi.dto.*;
import com.js.mcpapi.mapper.UserMapper;
import com.js.mcpapi.util.JwtTokenUtil;
import com.js.mcpapi.util.PasswordEncoder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    @Transactional
    public AuthResponseDto register(RegisterRequestDto request) {
        try {
            if (userMapper.checkUserExists(request.getUserId()) > 0) {
                return AuthResponseDto.builder()
                        .success(false)
                        .message("이미 존재하는 사용자 ID입니다.")
                        .build();
            }

            int userResult = userMapper.insertUser(request);

            if (userResult > 0) {
                String encodedPassword = passwordEncoder.encode(request.getPassword());
                int authResult = userMapper.insertUserAuth(request.getUserId(), encodedPassword);

                if (authResult > 0) {
                    return AuthResponseDto.builder()
                            .success(true)
                            .message("회원가입이 성공적으로 완료되었습니다.")
                            .build();
                } else {
                    throw new RuntimeException("인증 정보 생성에 실패했습니다.");
                }
            } else {
                return AuthResponseDto.builder()
                        .success(false)
                        .message("회원가입에 실패했습니다.")
                        .build();
            }

        } catch (Exception e) {
            return AuthResponseDto.builder()
                    .success(false)
                    .message("회원가입 처리 중 오류가 발생했습니다.")
                    .build();
        }
    }

    @Transactional
    public AuthResponseDto login(LoginRequestDto request) {
        try {
            String storedPassword = userMapper.selectUserPassword(request.getUserId());

            if (storedPassword == null) {
                return AuthResponseDto.builder()
                        .success(false)
                        .message("존재하지 않는 사용자입니다.")
                        .build();
            }

            if (!passwordEncoder.matches(request.getPassword(), storedPassword)) {
                return AuthResponseDto.builder()
                        .success(false)
                        .message("비밀번호가 일치하지 않습니다.")
                        .build();
            }

            UserInfoDto userInfo = userMapper.selectUserInfo(request.getUserId());

            if (userInfo.getUserFirstLoginDtm() == null) {
                userMapper.updateFirstLoginTime(request.getUserId());
                userInfo = userMapper.selectUserInfo(request.getUserId());
            }

            userMapper.updateLastLoginTime(request.getUserId());

            String token = jwtTokenUtil.generateToken(request.getUserId());

            return AuthResponseDto.builder()
                    .success(true)
                    .message("로그인이 성공적으로 완료되었습니다.")
                    .token(token)
                    .data(userInfo)
                    .build();

        } catch (Exception e) {
            return AuthResponseDto.builder()
                    .success(false)
                    .message("로그인 처리 중 오류가 발생했습니다.")
                    .build();
        }
    }
}