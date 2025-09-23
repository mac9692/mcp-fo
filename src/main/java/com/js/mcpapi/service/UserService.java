package com.js.mcpapi.service;

import com.js.mcpapi.dto.UserInfoDto;
import com.js.mcpapi.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserMapper userMapper;

    public UserInfoDto getUserInfo(String userId) {
        return userMapper.selectUserInfo(userId);
    }
}