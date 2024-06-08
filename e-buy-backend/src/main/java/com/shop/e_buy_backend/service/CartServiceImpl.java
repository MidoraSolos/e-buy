package com.shop.e_buy_backend.service;

import com.shop.e_buy_backend.model.Cart;
import com.shop.e_buy_backend.model.Product;
import com.shop.e_buy_backend.repository.CartRepository;
import com.shop.e_buy_backend.service.CartService;
import com.shop.e_buy_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    @Override
    public Cart addProductToCart(Long cartId, Long productId) {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        Product product = productService.getProductById(productId);

        if (cartOpt.isPresent() && product != null) {
            Cart cart = cartOpt.get();
            cart.addProduct(product);
            return cartRepository.save(cart);
        }
        return null; // Or throw an exception
    }

    @Override
    public Cart removeProductFromCart(Long cartId, Long productId) {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        Product product = productService.getProductById(productId);

        if (cartOpt.isPresent() && product != null) {
            Cart cart = cartOpt.get();
            cart.removeProduct(product);
            return cartRepository.save(cart);
        }
        return null; // Or throw an exception
    }

    @Override
    public Optional<Cart> getCartById(Long cartId) {
        return cartRepository.findById(cartId);
    }
}