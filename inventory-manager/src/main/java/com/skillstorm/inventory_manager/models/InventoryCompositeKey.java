package com.skillstorm.inventory_manager.models;


import java.io.Serializable;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


public class InventoryCompositeKey implements Serializable{
    
    @ManyToOne
    @JoinColumn(name = "p_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "w_id", referencedColumnName = "id")
    private Warehouse warehouse;


}
