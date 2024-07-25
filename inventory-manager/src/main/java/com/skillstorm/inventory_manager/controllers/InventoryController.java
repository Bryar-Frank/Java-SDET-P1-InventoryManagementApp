package com.skillstorm.inventory_manager.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventory_manager.models.Inventory;
import com.skillstorm.inventory_manager.services.InventoryService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryService service;
    
    @GetMapping()
    public List<Inventory> allInventory() {
        return service.findAll();
    }
    
}
