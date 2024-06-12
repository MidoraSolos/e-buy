package com.shop.e_buy_backend.service;

import com.shop.e_buy_backend.model.AppUserDetails;
import com.shop.e_buy_backend.model.Cart;
import com.shop.e_buy_backend.model.Product;
import com.shop.e_buy_backend.model.User;
import com.shop.e_buy_backend.repository.CartRepository;
import com.shop.e_buy_backend.repository.UserRepository;
import com.shop.e_buy_backend.util.PasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;
    public User saveUser(User user){


        PasswordGenerator passwordGenerator= new PasswordGenerator();
        user.setPassword(passwordGenerator.encodePassword(user.getPassword()));

        User savedUser = userRepository.save(user);
        Cart cart = new Cart();
        cart.setUser(user);
        cartRepository.save(cart);

        user.setCart(cart);

        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }

        return new AppUserDetails(user);
    }

    public boolean isValidUser(String email, String password) {
        User user = userRepository.findByEmail(email);
        return user != null && user.getPassword().equals(password);
    }



    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
