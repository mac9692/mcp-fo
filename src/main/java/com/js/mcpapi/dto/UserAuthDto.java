package com.js.mcpapi.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAuthDto {
    private String userId;
    private String userPassword;
    private String passwordSalt;
    private String authProvider;
    private String authProviderId;
    private String refreshToken;
    private LocalDateTime refreshTokenExpiry;
    private LocalDateTime lastLoginDtm;
    private int loginFailCount;
    private boolean isActive;
    private String sysRegId;
    private LocalDateTime sysRegDtm;
    private String sysModId;
    private LocalDateTime sysModDtm;
}