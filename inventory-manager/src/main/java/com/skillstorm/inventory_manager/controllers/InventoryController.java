package com.skillstorm.inventory_manager.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventory_manager.models.Inventory;
import com.skillstorm.inventory_manager.models.InventoryCompositeKey;
import com.skillstorm.inventory_manager.models.Product;
import com.skillstorm.inventory_manager.models.Warehouse;
import com.skillstorm.inventory_manager.services.InventoryService;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;





@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/inventory")
public class InventoryController {
    @Autowired
    private InventoryService service;

    /**
     * GET - retrieves data
     * POST - creates data
     * PUT - updates data
     * DELETE - deletes data
     */

    
    @GetMapping()
    public List<Inventory> findAllInventory() {
        return service.findAllInventory();
    }
    @GetMapping("/products")
    public List<Product> findAllProducts() {
        return service.findAllProducts();
    }
    
    @GetMapping("/item")
    public ResponseEntity<Inventory> findById(@Valid @RequestBody InventoryCompositeKey id) {
        Inventory item = service.findById(id);
        if (item != null) { 
            return ResponseEntity.ok(item);
        }
        else 
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Inventory create(@Valid @RequestBody Inventory item) {
        //creates a new entity
        return service.create(item);
    }

    @PutMapping
    public void update(@Valid @RequestBody Inventory item) {
        // update contents of item with specific id
        InventoryCompositeKey id = item.getId();
        service.update(id, item);
    }

    @DeleteMapping
    public void delete(@Valid @RequestBody InventoryCompositeKey id) {
        service.deleteById(id);;
    }
    
    
}
