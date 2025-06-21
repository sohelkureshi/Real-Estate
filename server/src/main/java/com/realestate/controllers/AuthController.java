package com.realestate.controller;

import com.realestate.dto.AuthRequest;
import com.realestate.dto.AuthResponse;
import com.realestate.model.User;
import com.realestate.repository.UserRepository;
import com.realestate.service.AuthService;
import com.realestate.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        authService.signup(user);
        return ResponseEntity.ok("User created successfully");
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody AuthRequest request, HttpServletResponse response) {
        User user = authService.signin(request);
        String token = jwtUtil.generateToken(user.getId());
        
        Cookie cookie = new Cookie("access_token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
        
        return ResponseEntity.ok(new AuthResponse(user.getId(), user.getUsername(), user.getEmail(), user.getAvatar()));
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleAuth(@RequestBody User user, HttpServletResponse response) {
        User authenticatedUser = authService.authenticateGoogleUser(user);
        String token = jwtUtil.generateToken(authenticatedUser.getId());
        
        Cookie cookie = new Cookie("access_token", token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        response.addCookie(cookie);
        
        return ResponseEntity.ok(new AuthResponse(
            authenticatedUser.getId(), 
            authenticatedUser.getUsername(), 
            authenticatedUser.getEmail(), 
            authenticatedUser.getAvatar()
        ));
    }

    @GetMapping("/signout")
    public ResponseEntity<?> signout(HttpServletResponse response) {
        Cookie cookie = new Cookie("access_token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
        return ResponseEntity.ok("User logged out");
    }
}
