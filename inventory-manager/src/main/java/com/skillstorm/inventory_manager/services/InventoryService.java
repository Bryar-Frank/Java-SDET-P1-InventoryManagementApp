package com.skillstorm.inventory_manager.services;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.skillstorm.inventory_manager.models.Inventory;
import com.skillstorm.inventory_manager.models.InventoryCompositeKey;
import com.skillstorm.inventory_manager.models.Product;
import com.skillstorm.inventory_manager.models.Warehouse;
import com.skillstorm.inventory_manager.repositories.InventoryRepository;
import com.skillstorm.inventory_manager.repositories.ProductRepository;
import com.skillstorm.inventory_manager.repositories.WarehouseRepository;

import jakarta.transaction.Transactional;

@Service
public class InventoryService {
    @Autowired
    private InventoryRepository repo;
    @Autowired
    private ProductRepository productRepo;
    @Autowired
    private WarehouseRepository warehouseRepo;

    public List<Inventory> findAllInventory() {
        return repo.findAll();
    }

    public Inventory findById(InventoryCompositeKey id) {
        Optional<Inventory> item = repo.findById(id);
        if (item.isPresent()) {
            /**
             * It is possible for only the IDs of a product/warehouse to be sent in
             * This will get the rest of the information for those requests
             * Allowing the http response to send back all information if needed
             */
            // item is currently Optional<Inventory>
            Inventory existingItem = item.get();
            InventoryCompositeKey compositeId = existingItem.getId();
            
            // getting all the information about the products and warehouses from their repositories
            Product product = productRepo.findById(compositeId.getProduct().getId()).get();
            Warehouse warehouse = warehouseRepo.findById(compositeId.getWarehouse().getId()).get();
            
            // Update the existing item with all the new information
            compositeId.setProduct(product);
            compositeId.setWarehouse(warehouse);
            existingItem.setId(compositeId);
            
            return existingItem;
        }
        else 
            return null;
    }

    @Transactional // Rollback on RuntimeExceptions
    public Inventory create(Inventory item) {
        
        //Assuming that warehouse and product are not null due to @Valid on Controller method
        InventoryCompositeKey id = item.getId();
        Warehouse warehouse = id.getWarehouse();
        Product product = id.getProduct();

        if (!warehouseRepo.existsById(warehouse.getId())) {
            throw new RuntimeException(
                String.format("Cannot save item because warehouse: %s does not exist", warehouse)
            );
        }
        if (!productRepo.existsById(product.getId())) {
            throw new RuntimeException(
                String.format("Cannot save item because product: %s does not exist", product)
            );
        }
        
        Warehouse existingWarehouse = warehouseRepo.findById(warehouse.getId()).get();
        Product existingProduct = productRepo.findById(product.getId()).get();
        id.setWarehouse(existingWarehouse); // This should handle correctly due to foreign keys
        id.setProduct(existingProduct);
        item.setId(id);
        
        return repo.save(item);
    }

    public void update(InventoryCompositeKey id, Inventory item) {
        if (repo.existsById(id)) {
            item.setId(id);
            repo.save(item);
        } else {
            throw new NoSuchElementException("Inventory with id: " + id + "does not exist");
        }
    }

    public void deleteById(InventoryCompositeKey id) {
        repo.deleteById(id);
    }

}
