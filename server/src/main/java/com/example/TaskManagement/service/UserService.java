package com.example.TaskManagement.service;

import com.example.TaskManagement.dto.*;
import com.example.TaskManagement.models.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    Optional<User> findByEmail(String email);
    JwtResponse getUserById(Integer id);
    List<JwtResponse> getAllUsers();
}
