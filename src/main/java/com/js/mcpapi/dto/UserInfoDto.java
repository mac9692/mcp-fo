package com.js.mcpapi.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoDto {
    private String userId;
    private String userNm;
    private String userEmail;
    private String userPhone;
    private LocalDate userBirthDt;
    private LocalDateTime userFirstLoginDtm;
}