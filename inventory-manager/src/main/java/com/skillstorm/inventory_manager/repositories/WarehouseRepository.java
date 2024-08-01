package com.skillstorm.inventory_manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventory_manager.models.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse, Integer> {
    
    boolean existsByWarehouseNameAndStateAndCityAndAddress(String warehouseName, String state, String city, String address);
    Warehouse findByWarehouseNameAndStateAndCityAndAddress(String warehouseName, String state, String city, String address);
}
