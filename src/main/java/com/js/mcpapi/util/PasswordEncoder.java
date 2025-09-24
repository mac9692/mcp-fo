package com.js.mcpapi.util;

import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

@Component
public class PasswordEncoder {

    public String encode(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] salt = generateSalt();
            byte[] saltedPassword = (password + bytesToHex(salt)).getBytes();
            byte[] hashedBytes = digest.digest(saltedPassword);
            return bytesToHex(salt) + ":" + bytesToHex(hashedBytes);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Password encoding failed", e);
        }
    }

    public boolean matches(String password, String encodedPassword) {
        try {
            String[] parts = encodedPassword.split(":");
            if (parts.length != 2) {
                return false;
            }

            String salt = parts[0];
            String hash = parts[1];

            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] saltedPassword = (password + salt).getBytes();
            byte[] hashedBytes = digest.digest(saltedPassword);
            String hashedPassword = bytesToHex(hashedBytes);

            return hash.equals(hashedPassword);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Password verification failed", e);
        }
    }

    private byte[] generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return salt;
    }

    private String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
}