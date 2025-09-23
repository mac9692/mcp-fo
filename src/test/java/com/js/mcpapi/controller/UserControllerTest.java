package com.js.mcpapi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.js.mcpapi.dto.UserInfoDto;
import com.js.mcpapi.dto.UserRequestDto;
import com.js.mcpapi.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void getUserInfo_Success() throws Exception {
        // Given
        UserRequestDto request = new UserRequestDto("1");
        UserInfoDto mockUserInfo = new UserInfoDto(
                "1",
                "박진성",
                "mac9692@nate.com",
                "01036349692",
                LocalDate.of(1994, 10, 6),
                null
        );

        given(userService.getUserInfo("1")).willReturn(mockUserInfo);

        // When & Then
        mockMvc.perform(post("/api/user/getUserInfo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.userId").value("1"))
                .andExpect(jsonPath("$.userNm").value("박진성"))
                .andExpect(jsonPath("$.userEmail").value("mac9692@nate.com"))
                .andExpect(jsonPath("$.userPhone").value("01036349692"))
                .andExpect(jsonPath("$.userBirthDt").value("1994-10-06"))
                .andExpect(jsonPath("$.userFirstLoginDtm").isEmpty());
    }

    @Test
    void getUserInfo_NotFound() throws Exception {
        // Given
        UserRequestDto request = new UserRequestDto("999");
        given(userService.getUserInfo("999")).willReturn(null);

        // When & Then
        mockMvc.perform(post("/api/user/getUserInfo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    void getUserInfo_InternalServerError() throws Exception {
        // Given
        UserRequestDto request = new UserRequestDto("1");
        given(userService.getUserInfo(anyString())).willThrow(new RuntimeException("Database error"));

        // When & Then
        mockMvc.perform(post("/api/user/getUserInfo")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isInternalServerError());
    }
}