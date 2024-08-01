package com.skillstorm.inventory_manager.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;

import com.skillstorm.inventory_manager.models.Warehouse;
import com.skillstorm.inventory_manager.repositories.WarehouseRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.transaction.Transactional;

public class WarehouseService {
    @Autowired
    private WarehouseRepository repo;

    public List<Warehouse> findAllWarehouses() {
        return repo.findAll();
    }

    @Transactional // Rollback on RuntimeExceptions
    public Warehouse create(Warehouse warehouse) {

        String warehouseName = warehouse.getWarehouseName().toLowerCase();
        String state = warehouse.getState().toLowerCase();
        String city = warehouse.getCity().toLowerCase();
        String address = warehouse.getAddress().toLowerCase();
        if (repo.existsByWarehouseName(warehouseName) && repo.existsByStateAndCityAndAddress(state, city, address)) {
            throw new EntityExistsException("Warehouse already exists");
        }
        //Assuming that warehouse and product are not null due to @Valid on Controller method
        return repo.save(warehouse);
    }

    public void update(Integer id, Warehouse warehouse) {
        if (repo.existsById(id)) {
            warehouse.setId(id);
            repo.save(warehouse);
        } else {
            throw new NoSuchElementException("Warehouse with id: " + id + "does not exist");
        }
    }

    public void deleteById(Integer id) {
        repo.deleteById(id);
    }
}
