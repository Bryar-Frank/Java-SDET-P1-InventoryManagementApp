package com.skillstorm.inventory_manager.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventory_manager.models.Inventory;
import com.skillstorm.inventory_manager.models.InventoryCompositeKey;
import com.skillstorm.inventory_manager.models.Warehouse;
import com.skillstorm.inventory_manager.services.WarehouseService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/warehouse")
public class WarehouseController {
    @Autowired
    private WarehouseService service;

    @GetMapping("/warehouses")
    public List<Warehouse> findAllWarehouses() {
        return service.findAllWarehouses();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public Warehouse create(@Valid @RequestBody Warehouse warehouse) {
        //creates a new entity
        return service.create(warehouse);
    }

    @PutMapping
    public void update(@Valid @RequestBody Warehouse warehouse) {
        // update contents of item with specific id
        Integer id = warehouse.getId();
        service.update(id, warehouse);
    }
    
    @DeleteMapping
    public void delete(@Valid @RequestBody Integer id) {
        service.deleteById(id);;
    }

}
