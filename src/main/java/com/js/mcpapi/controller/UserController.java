package com.js.mcpapi.controller;

import com.js.mcpapi.dto.UserInfoDto;
import com.js.mcpapi.dto.UserRequestDto;
import com.js.mcpapi.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/getUserInfo")
    public ResponseEntity<UserInfoDto> getUserInfo(@RequestBody UserRequestDto request) {
        try {
            UserInfoDto userInfo = userService.getUserInfo(request.getUserId());
            if (userInfo != null) {
                return ResponseEntity.ok(userInfo);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}