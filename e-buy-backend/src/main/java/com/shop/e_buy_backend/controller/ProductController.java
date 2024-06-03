package com.shop.e_buy_backend.controller;

import com.shop.e_buy_backend.model.Product;
import com.shop.e_buy_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<Product>> getAllProducts()
    {
        List<Product> allProducts = productService.getAllProducts();
        return new ResponseEntity<>(allProducts , HttpStatus.OK);

    }
}
