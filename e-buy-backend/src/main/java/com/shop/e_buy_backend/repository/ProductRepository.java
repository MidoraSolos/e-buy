package com.shop.e_buy_backend.repository;

import com.shop.e_buy_backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long> {
//    @Query(value = "select * from ebuy.products",nativeQuery = true)
//    List<Product> getAllProducts();

//    Product createProduct(Product product);
}
