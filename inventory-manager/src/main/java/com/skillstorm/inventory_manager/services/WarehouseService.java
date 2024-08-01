package com.skillstorm.inventory_manager.services;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventory_manager.models.Warehouse;
import com.skillstorm.inventory_manager.repositories.WarehouseRepository;

import jakarta.persistence.EntityExistsException;
import jakarta.transaction.Transactional;

@Service
public class WarehouseService {
    @Autowired
    private WarehouseRepository repo;

    public List<Warehouse> findAllWarehouses() {
        return repo.findAll();
    }

    @Transactional // Rollback on RuntimeExceptions
    public Warehouse create(Warehouse warehouse) {

        //Assuming that warehouse not null due to @Valid on Controller method
        String warehouseName = warehouse.getWarehouseName();
        String state = warehouse.getState();
        String city = warehouse.getCity();
        String address = warehouse.getAddress();

        if (repo.existsByWarehouseNameAndStateAndCityAndAddress(warehouseName,state, city, address)) {
            throw new EntityExistsException("Warehouse already exists");
        }
        
        return repo.save(warehouse);
    }

    public Warehouse update(Integer id, Warehouse warehouse) {
        if (repo.existsById(id)) {
            warehouse.setId(id);
            return repo.save(warehouse);
        } else {
            throw new NoSuchElementException("Warehouse with id: " + id + "does not exist");
        }
    }

    public void deleteById(Integer id) {
        repo.deleteById(id);
    }
}
