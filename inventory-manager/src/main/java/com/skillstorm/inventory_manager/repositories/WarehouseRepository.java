package com.skillstorm.inventory_manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventory_manager.models.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {
    
    boolean existsByWarehouseName(String warehouseName);

    boolean existsByStateAndCityAndAddress(String state, String city, String address);
}
