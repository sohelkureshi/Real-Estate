package com.realestate.controller;

import com.realestate.model.User;
import com.realestate.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/update/{id}")
    public ResponseEntity<User> updateUser(
        @PathVariable String id, 
        @RequestBody User user,
        @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(userService.updateUser(id, user, currentUser));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(
        @PathVariable String id,
        @AuthenticationPrincipal User currentUser
    ) {
        userService.deleteUser(id, currentUser);
        return ResponseEntity.ok("User deleted");
    }

    @GetMapping("/listings/{id}")
    public ResponseEntity<?> getUserListings(
        @PathVariable String id,
        @AuthenticationPrincipal User currentUser
    ) {
        return ResponseEntity.ok(userService.getUserListings(id, currentUser));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUser(id));
    }
}
