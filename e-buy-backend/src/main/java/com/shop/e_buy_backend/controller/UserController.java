package com.shop.e_buy_backend.controller;

import com.shop.e_buy_backend.model.Product;
import com.shop.e_buy_backend.model.User;
import com.shop.e_buy_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    @Autowired
    private UserService userService;



    @GetMapping("/getAllUsers")
    public ResponseEntity<List<User>> getAllUsers()
    {
        List<User> allUsers = userService.getAllUsers();
        return new ResponseEntity<>(allUsers , HttpStatus.OK);

    }

    @GetMapping("/getSingleUser/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id )
    {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user , HttpStatus.OK);

    }

}
