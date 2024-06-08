package com.shop.e_buy_backend.controller;

import com.shop.e_buy_backend.model.AppUserDetails;
import com.shop.e_buy_backend.model.User;
import com.shop.e_buy_backend.repository.UserRepository;
import com.shop.e_buy_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
@CrossOrigin(origins = {"http://localhost:5173"})
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/login")
    public ResponseEntity<User> getLoginPage() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            User currentUser = ((AppUserDetails) auth.getPrincipal()).getUser();
            return ResponseEntity.ok(currentUser);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/api/v1/signUp")
    public ResponseEntity<String> saveUser(@RequestBody User user){
        try{

            User newUser=userService.saveUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("User Created Successfully");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.FOUND).body("Email already exists");
        }
    }

}
