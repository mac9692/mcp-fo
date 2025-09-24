package com.js.mcpapi.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {
    private String userId;
    private String password;
    private String userNm;
    private String userEmail;
    private String userPhone;
    private String userBirthDt;
}