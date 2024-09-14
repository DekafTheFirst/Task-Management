package com.example.TaskManagement.controller;

import com.example.TaskManagement.dto.JwtResponse;
import com.example.TaskManagement.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    private final UserService userService;

    @GetMapping("/{userId}")
    public ResponseEntity<JwtResponse> getUser(@PathVariable Integer userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }

    @GetMapping("/allUsers")
    public ResponseEntity<List<JwtResponse>> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }
}
