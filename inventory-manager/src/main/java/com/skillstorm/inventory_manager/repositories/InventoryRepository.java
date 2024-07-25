package com.skillstorm.inventory_manager.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.skillstorm.inventory_manager.models.Inventory;
import com.skillstorm.inventory_manager.models.InventoryCompositeKey;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, InventoryCompositeKey> {
    
}
