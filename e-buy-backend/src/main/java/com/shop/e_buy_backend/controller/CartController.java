package com.shop.e_buy_backend.controller;

import com.shop.e_buy_backend.exception.CartNotFoundException;
import com.shop.e_buy_backend.model.Cart;
import com.shop.e_buy_backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/{userId}/{cartId}/addProduct/{productId}")
    public ResponseEntity<Cart> addProductToCart(@PathVariable Long userId, @PathVariable Long cartId, @PathVariable Long productId) throws CartNotFoundException {
        Cart updatedCart = cartService.addProductToCart(userId, cartId, productId);
        if (updatedCart != null) {
            return new ResponseEntity<>(updatedCart, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}/{cartId}/removeProduct/{productId}")
    public ResponseEntity<Cart> removeProductFromCart(@PathVariable Long userId, @PathVariable Long cartId, @PathVariable Long productId) {
        Cart updatedCart = cartService.removeProductFromCart(userId, cartId, productId);
        if (updatedCart != null) {
            return new ResponseEntity<>(updatedCart, HttpStatus.OK);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}/{cartId}")
    public ResponseEntity<Cart> getCart(@PathVariable Long userId, @PathVariable Long cartId) {
        Optional<Cart> cart = cartService.getCartById(userId, cartId);
        return cart.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{userId}/{cartId}/removeProducts")
    public ResponseEntity<Cart> removeAllProductsFromCart(@PathVariable Long userId, @PathVariable Long cartId) {
        try {
            Cart updatedCart = cartService.removeAllProductsFromCart(userId, cartId);
            return ResponseEntity.ok(updatedCart);
        } catch (CartNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}