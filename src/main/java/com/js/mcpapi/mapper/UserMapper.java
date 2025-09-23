package com.js.mcpapi.mapper;

import com.js.mcpapi.dto.UserInfoDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface UserMapper {
    UserInfoDto selectUserInfo(@Param("userId") String userId);
}