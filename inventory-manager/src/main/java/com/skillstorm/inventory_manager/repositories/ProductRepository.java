package com.skillstorm.inventory_manager.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventory_manager.models.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
    boolean existsByProductNameAndSize(String productName, Integer size);

    Optional<Product> findByProductNameAndSize(String productName, Integer size);
}
