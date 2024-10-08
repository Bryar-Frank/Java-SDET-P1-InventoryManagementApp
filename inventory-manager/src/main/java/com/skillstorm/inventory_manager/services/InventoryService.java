package com.skillstorm.inventory_manager.services;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skillstorm.inventory_manager.models.Inventory;
import com.skillstorm.inventory_manager.models.InventoryCompositeKey;
import com.skillstorm.inventory_manager.models.Product;
import com.skillstorm.inventory_manager.models.Warehouse;
import com.skillstorm.inventory_manager.repositories.InventoryRepository;
import com.skillstorm.inventory_manager.repositories.ProductRepository;
import com.skillstorm.inventory_manager.repositories.WarehouseRepository;

import jakarta.persistence.EntityExistsException;
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
    public List<Product> findAllProducts() {
        return productRepo.findAll();
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
        String pName = product.getProductName();
        Integer size = product.getSize();
        // we need to first check if the warehouse and product exist

        //for the warehouse, if it doesn't exist throw an error
        if ( !warehouseRepo.existsById(warehouse.getId()) ) {
            throw new RuntimeException(
                String.format(
                    "Cannot save item because warehouse: %s does not exist. Possibly create a warehouse first", 
                    warehouse.getWarehouseName()
                )
            );
        }

        //next for the product if it doesn't exist, we need to make and persist it
        if (productRepo.existsByProductNameAndSize(pName, size)) {    
            product = productRepo.findByProductNameAndSize(pName, size).get();
        
        } else { //create new product
            Product newProduct = new Product();
            newProduct.setProductName(product.getProductName());
            newProduct.setSize(product.getSize());
            product = productRepo.save(newProduct);
        }

        //now that we know the product and warehouse exist we can only save it if the id isn't taken already
        //so we check if the Composite key already exists
        id.setProduct(product);
        id.setWarehouse(warehouseRepo.findById(warehouse.getId()).get());
        if (repo.existsById(id)) {
            throw new EntityExistsException("Item already exists in warehouse!");
        }

        //now its time to create the new inventory item and save the entity!!!
        item.setId(id);
        return repo.save(item);
    }


    public Inventory update(InventoryCompositeKey id, Inventory item) {
        if (repo.existsById(id)) {
            //in case info was changed on the warehouse we should not change it but still return the correct warehouse
            Warehouse warehouse = warehouseRepo.findById(id.getWarehouse().getId()).get();
            id.setWarehouse(warehouse);

            //incase product info was updated, we should update it here, but not warehouse info
            //we don't need to check if product exists if Inventory id exists, so we just save it
            Product updatedProduct = id.getProduct();
            productRepo.save(updatedProduct);

            item.setId(id);
            return repo.save(item);
        } else {
            throw new NoSuchElementException("Inventory with id: " + id + "does not exist");
        }
    }

    public void deleteById(InventoryCompositeKey id) {
        repo.deleteById(id);
    }

}
