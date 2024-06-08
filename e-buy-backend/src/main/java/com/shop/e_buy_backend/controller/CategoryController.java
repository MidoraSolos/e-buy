package com.shop.e_buy_backend.controller;

import com.shop.e_buy_backend.model.Category;
import com.shop.e_buy_backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("{categoryId}/findCategoryById")
    public ResponseEntity<Category> findCategoryById(@PathVariable("categoryId") Long categoryId) {
        return new ResponseEntity<>(this.categoryService.findCategoryById(categoryId), HttpStatus.OK);
    }

}
