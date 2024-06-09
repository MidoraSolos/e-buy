package com.shop.e_buy_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    private Long price;

    @ManyToMany
//    @JoinColumn(name="cart_id")
    private List<Product> cartProducts = new ArrayList<>();

    @JsonIgnore
    @OneToOne
    @JoinColumn(name="user_id")
    private User user;


    public Cart() {}

    public Cart(Long id, String name, Long price, List<Product> cartProducts, User user) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.cartProducts = cartProducts;
        this.user = user;
    }

    // Getter and Setter methods

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public List<Product> getCartProducts() {
        return cartProducts;
    }

    public void setCartProducts(List<Product> cartProducts) {
        this.cartProducts = cartProducts;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}