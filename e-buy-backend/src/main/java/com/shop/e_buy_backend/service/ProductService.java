package com.shop.e_buy_backend.service;

import com.shop.e_buy_backend.model.Product;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product createProduct(Product product);
}
