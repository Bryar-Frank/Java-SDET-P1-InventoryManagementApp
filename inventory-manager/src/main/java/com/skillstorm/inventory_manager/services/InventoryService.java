package com.skillstorm.inventory_manager.services;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import javax.management.RuntimeErrorException;

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
        String wName = warehouse.getWarehouseName();
        String state = warehouse.getState();
        String city = warehouse.getCity();
        String address = warehouse.getAddress();
        
        Product product = id.getProduct();
        String pName = product.getProductName();
        Integer size = product.getSize();

        //first we want to check if the warehouse exists, and if not warn to make a warehouse first
        // we check this by checking that warehouse neither exists by id or by its values
        if (!warehouseRepo.existsByWarehouseNameAndStateAndCityAndAddress(wName, state, city, address)
                                                        && !warehouseRepo.existsById(warehouse.getId())) {
            throw new RuntimeException(
                String.format("Cannot save item because warehouse: %s does not exist. Possibly create a warehouse first", warehouse)
            );
        
        //now we know the warehouse exists, we want to check if the produt request had an id, and if it doesn't exist throw error
        } else if ( product.getId() != null && !productRepo.existsById(product.getId()) ) {
            throw new RuntimeException("prodcut id does not exist");
        
        //now that we know the warehouse exists and the product wasn't send with an incorrect id
        //the server can check if the product/warehouse combo already exists, and if so, throw error
        } else if (repo.existsById(id)) {
        
            throw new EntityExistsException("Product already exists in Warehouse. Please use update method");
        
        //now the only options left are that the product exits, but not in that warehouse, OR it doesn't exist
        // so we check if the product doesn't exist, and if it doesn't create a new one.
        }  else if (!productRepo.existsByProductNameAndSize(pName, size) && !productRepo.existsById(product.getId()))  {
            
            //NOTE we don't have to worry here about "product" not having Product Name/size fields because we check for that pn front end
            Product newProduct = new Product();
            newProduct.setProductName(product.getProductName());
            newProduct.setSize(product.getSize());
            product = productRepo.save(newProduct);

        } //Now we know both the warehouse and product are existing so we create a new row in inventory


        //need to first figure out if product/warehouse request had warehouse info, or id's
        if (warehouse.getId()==null) {
            warehouse = warehouseRepo.findByWarehouseNameAndStateAndCityAndAddress(wName, state, city, address);
        } // and do the same with prodcut
        if (product.getId()==null) {
            product = productRepo.findByProductNameAndSize(pName, size);
        }

        //now its time to create the new id and save the entity!!!
        id.setProduct(product);
        id.setWarehouse(warehouse);
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
