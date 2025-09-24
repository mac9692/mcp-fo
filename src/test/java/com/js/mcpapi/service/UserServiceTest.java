package com.js.mcpapi.service;

import com.js.mcpapi.dto.UserInfoDto;
import com.js.mcpapi.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    @Test
    void getUserInfo_Success() {
        // Given
        String userId = "1";
        UserInfoDto expectedUserInfo = new UserInfoDto(
                "1",
                "박진성",
                "mac9692@nate.com",
                "01036349692",
                LocalDate.of(1994, 10, 6),
                null
        );

        given(userMapper.selectUserInfo(userId)).willReturn(expectedUserInfo);

        // When
        UserInfoDto result = userService.getUserInfo(userId);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getUserId()).isEqualTo("1");
        assertThat(result.getUserNm()).isEqualTo("박진성");
        assertThat(result.getUserEmail()).isEqualTo("mac9692@nate.com");
        assertThat(result.getUserPhone()).isEqualTo("01036349692");
        assertThat(result.getUserBirthDt()).isEqualTo(LocalDate.of(1994, 10, 6));
        assertThat(result.getUserFirstLoginDtm()).isNull();

        verify(userMapper).selectUserInfo(userId);
    }

    @Test
    void getUserInfo_NotFound() {
        // Given
        String userId = "999";
        given(userMapper.selectUserInfo(userId)).willReturn(null);

        // When
        UserInfoDto result = userService.getUserInfo(userId);

        // Then
        assertThat(result).isNull();
        verify(userMapper).selectUserInfo(userId);
    }

    @Test
    void getUserInfo_WithFirstLoginDtm() {
        // Given
        String userId = "1";
        LocalDateTime loginDtm = LocalDateTime.now();
        UserInfoDto expectedUserInfo = new UserInfoDto(
                "1",
                "박진성",
                "mac9692@nate.com",
                "01036349692",
                LocalDate.of(1994, 10, 6),
                loginDtm
        );

        given(userMapper.selectUserInfo(userId)).willReturn(expectedUserInfo);

        // When
        UserInfoDto result = userService.getUserInfo(userId);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getUserFirstLoginDtm()).isEqualTo(loginDtm);
        verify(userMapper).selectUserInfo(userId);
    }
}