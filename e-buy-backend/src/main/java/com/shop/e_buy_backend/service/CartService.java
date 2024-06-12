package com.shop.e_buy_backend.service;

import com.shop.e_buy_backend.exception.CartNotFoundException;
import com.shop.e_buy_backend.model.Cart;

import java.util.Optional;

public interface CartService {
    Cart addProductToCart(Long userId,Long cartId, Long productId ) throws CartNotFoundException;
    Cart removeProductFromCart(Long userId,Long cartId, Long productId);
    Optional<Cart> getCartById(Long userId, Long cartId);
    Cart saveCart(Cart cart);
}