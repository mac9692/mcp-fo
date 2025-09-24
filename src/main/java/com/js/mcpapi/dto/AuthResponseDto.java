package com.js.mcpapi.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthResponseDto {
    private boolean success;
    private String message;
    private String token;
    private UserInfoDto data;
}