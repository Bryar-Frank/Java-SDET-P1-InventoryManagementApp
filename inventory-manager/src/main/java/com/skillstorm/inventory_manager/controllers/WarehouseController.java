package com.skillstorm.inventory_manager.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.skillstorm.inventory_manager.models.Warehouse;
import com.skillstorm.inventory_manager.services.WarehouseService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@CrossOrigin(origins = "http://localhost:5173/")
@RequestMapping("/warehouse")
public class WarehouseController {
    @Autowired
    private WarehouseService service;

    @GetMapping
    public List<Warehouse> findAllWarehouses() {
        return service.findAllWarehouses();
    }

    @PostMapping("/add")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Warehouse create(@RequestBody Warehouse warehouse) {
        //creates a new entity
        return service.create(warehouse);
    }

    @PutMapping("/update")
    public Warehouse update(@Valid @RequestBody Warehouse warehouse) {
        // update contents of item with specific id
        Integer id = warehouse.getId();
        return service.update(id, warehouse);
    }
    
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.deleteById(id);;
    }

}
