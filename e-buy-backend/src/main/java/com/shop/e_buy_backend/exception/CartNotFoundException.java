package com.shop.e_buy_backend.exception;

public class CartNotFoundException extends Throwable {
    public CartNotFoundException(String message) {
        super(message);
    }
}
