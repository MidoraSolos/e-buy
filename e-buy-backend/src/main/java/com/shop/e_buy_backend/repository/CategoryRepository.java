package com.shop.e_buy_backend.repository;

import com.shop.e_buy_backend.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query(value = "select * from ebuy.category where category.id = :categoryId" ,nativeQuery = true)
    Category findCategoryById(Long categoryId);

}
