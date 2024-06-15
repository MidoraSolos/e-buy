package com.shop.e_buy_backend.service;

import com.shop.e_buy_backend.exception.CartNotFoundException;
import com.shop.e_buy_backend.model.Cart;
import com.shop.e_buy_backend.model.Product;
import com.shop.e_buy_backend.model.User;
import com.shop.e_buy_backend.repository.CartRepository;
import com.shop.e_buy_backend.repository.UserRepository;
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

    @Autowired
    private UserService userService;

    @Override
    public Cart addProductToCart(Long userId,Long cartId, Long productId ) throws CartNotFoundException {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
//        Cart cart ;
//        if(cartOpt==null){
//            cart=new Cart();
//        }
        Product product = productService.getProductById(productId);
        User user = userService.getUserById(userId);
        if (cartOpt.isPresent() && product != null && user!=null) {
            Cart cart = cartOpt.get();
            cart.getCartProducts().add(product);
            return cartRepository.save(cart);
        }
        else {
            throw new CartNotFoundException("Cart with id: " + cartId + " not found!");
        }
    }

    @Override
    public Cart removeProductFromCart(Long userId, Long cartId,Long productId) {
        Optional<Cart> cartOpt = cartRepository.findById(cartId);
        Product product = productService.getProductById(productId);
        User user = userService.getUserById(userId);
        if (cartOpt.isPresent() && product != null && user != null) {
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
    public Optional<Cart> getCartById(Long userId,Long cartId) {
        User user =userService.getUserById(userId);
        return cartRepository.findById(cartId);
    }

    @Override
    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }


    @Override
    public Cart removeAllProductsFromCart(Long userId, Long cartId) throws CartNotFoundException {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() -> new CartNotFoundException("Cart with id: " + cartId + " not found"));

        cart.getCartProducts().clear(); // Remove all products from cart
        return cartRepository.save(cart);
    }
}

