package com.shop.e_buy_backend.controller;

import com.shop.e_buy_backend.model.Product;
import com.shop.e_buy_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/getSingleProduct/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id )
    {
       Product product = productService.getProductById(id);
        return new ResponseEntity<>(product , HttpStatus.OK);

    }

    @PostMapping("/createProduct")
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        Product newProduct=productService.createProduct(product);
        return new ResponseEntity<>(newProduct,HttpStatus.CREATED);
    }
}
