package com.realestate.service;

import com.realestate.dto.AuthRequest;
import com.realestate.exception.AuthException;
import com.realestate.model.User;
import com.realestate.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void signup(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public User signin(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AuthException("User not found"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AuthException("Wrong credentials");
        }
        return user;
    }

    public User authenticateGoogleUser(User googleUser) {
        Optional<User> existingUser = userRepository.findByEmail(googleUser.getEmail());
        
        if (existingUser.isPresent()) {
            return existingUser.get();
        } else {
            // Create new user for Google auth
            User newUser = new User();
            newUser.setEmail(googleUser.getEmail());
            newUser.setAvatar(googleUser.getAvatar());
            newUser.setUsername(
                googleUser.getName().replaceAll(" ", "").toLowerCase() + 
                UUID.randomUUID().toString().substring(0, 4)
            );
            newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
            return userRepository.save(newUser);
        }
    }
}
