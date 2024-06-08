package com.shop.e_buy_backend.service;

import com.shop.e_buy_backend.model.Category;
import com.shop.e_buy_backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;


    @Override
    public Category findCategoryById(Long categoryId) {
        return categoryRepository.findCategoryById(categoryId);
    }
}
