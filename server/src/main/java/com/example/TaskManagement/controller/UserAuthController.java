package com.example.TaskManagement.controller;

import com.example.TaskManagement.dto.JwtResponse;
import com.example.TaskManagement.dto.LogInRequest;
import com.example.TaskManagement.dto.SignInRequest;
import com.example.TaskManagement.models.User;
import com.example.TaskManagement.service.UserAuthService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserAuthController {
    private final UserAuthService userAuthService;
    private static final Logger logger = LoggerFactory.getLogger(UserAuthController.class);

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello";
    }

    @PostMapping("/signup")
    public ResponseEntity<?> createUser(@RequestBody SignInRequest signInRequest) {
        try {
            User user = userAuthService.createUser(signInRequest);
            return ResponseEntity.ok(user);
        } catch (RuntimeException ex) {
            logger.error("Error occurred while creating user: {}", ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> logIn(@RequestBody LogInRequest logInRequest) {
        try {
            JwtResponse jwtResponse = userAuthService.logIn(logInRequest);
            return ResponseEntity.ok(jwtResponse);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
