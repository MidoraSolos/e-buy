package com.shop.e_buy_backend.service;

import com.shop.e_buy_backend.model.Category;

public interface CategoryService {

    Category findCategoryById(Long categoryId);
}
