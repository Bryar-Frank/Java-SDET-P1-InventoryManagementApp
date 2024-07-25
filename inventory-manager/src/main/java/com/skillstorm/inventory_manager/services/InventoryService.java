package com.skillstorm.inventory_manager.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventory_manager.models.Inventory;
import com.skillstorm.inventory_manager.repositories.InventoryRepository;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository repo;

    public List<Inventory> findAll() {
        return repo.findAll();
    }
}
