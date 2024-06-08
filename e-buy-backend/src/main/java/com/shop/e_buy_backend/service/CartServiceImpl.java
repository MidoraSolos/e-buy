package com.shop.e_buy_backend.service;

import com.shop.e_buy_backend.exception.CartNotFoundException;
import com.shop.e_buy_backend.model.Cart;
import com.shop.e_buy_backend.model.Product;
import com.shop.e_buy_backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductService productService;

    @Override
    public Cart addProductToCart(Long cartId, Long productId) throws CartNotFoundException {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        Product product = productService.getProductById(productId);
        if (cartOpt.isPresent() && product != null) {
            Cart cart = cartOpt.get();
            cart.getCartProducts().add(product);

            return cartRepository.save(cart);
        }
        else {
            throw new CartNotFoundException("Cart with id: " + cartId + " not found!");
        }
    }

    @Override
    public Cart removeProductFromCart(Long cartId, Long productId) {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        Product product = productService.getProductById(productId);

        if (cartOpt.isPresent() && product != null) {
            Cart cart = cartOpt.get();
            List<Product> cartProducts = cart.getCartProducts();
            for (int i = 0; i < cartProducts.size(); i++) {
                if (Objects.equals(cartProducts.get(i).getId(), productId)) {
                    cartProducts.remove(i);
                }
            }
            return cartRepository.save(cart);
        }
        return null; // Or throw an exception
    }

    @Override
    public Optional<Cart> getCartById(Long cartId) {
        return cartRepository.findById(cartId);
    }
}