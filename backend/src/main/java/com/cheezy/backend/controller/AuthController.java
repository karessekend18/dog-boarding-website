package com.cheezy.backend.controller;


import com.cheezy.backend.model.AdminUser;
import com.cheezy.backend.repository.AdminRepository;
import com.cheezy.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:8081")
public class AuthController {

    private final AdminRepository adminRepo;
    private final PasswordEncoder encoder;

    public AuthController(AdminRepository adminRepo, PasswordEncoder encoder) {
        this.adminRepo = adminRepo;
        this.encoder = encoder;
    }

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> req) {

        AdminUser admin = adminRepo.findByUsername(req.get("username"))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // 🔴 DEBUG (TEMPORARY)
        System.out.println("PASSWORD FROM DB = [" + admin.getPassword() + "]");
        System.out.println("PASSWORD LENGTH = " + admin.getPassword().length());

        if (!encoder.matches(req.get("password"), admin.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = JwtUtil.generateToken(admin.getUsername());
        return Map.of("token", token, "role", "admin");
    }


    @GetMapping("/me")
    public Map<String, String> me(@RequestHeader("Authorization") String auth) {
        String token = auth.replace("Bearer ", "");
        String username = JwtUtil.validateAndGetUsername(token);
        return Map.of("username", username, "role", "admin");
    }
}
