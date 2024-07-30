package com.skillstorm.inventory_manager.models;


import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;


/**
 * INVENTORY (PRIMARY KEY = w_id + p_id)
 *      w_id     INT
 *      p_id     INT
 *      quantity INT
 *      price    INT
 *      max_cap  INT
 * 
 * w_id -> WAREHOUSE
 *      id       INT
 *      name     VARCHAR
 *      state    VARCHAR
 *      city     VARCHAR
 *      address  VARCHAR
 *      capacity VARCHAR
 * 
 * p_id => PRODUCTs
 *      id      INT
 *      name    VARCHAR
 *      size    INT
 */

@Entity
@Table(name = "inventory")
public class Inventory {

    @EmbeddedId
    @Cascade(CascadeType.ALL)
    InventoryCompositeKey id;

    private Integer quantity;
    private Double price;
    private Integer capacity;
    
    public Inventory() {
    }
    public Inventory(InventoryCompositeKey id, Integer quantity, Double price, Integer capacity) {
        this.id = id;
        this.quantity = quantity;
        this.price = price;
        this.capacity = capacity;
    }
    public InventoryCompositeKey getId() {
        return id;
    }
    public void setId(InventoryCompositeKey id) {
        this.id = id;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public Integer getCapacity() {
        return capacity;
    }
    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((quantity == null) ? 0 : quantity.hashCode());
        result = prime * result + ((price == null) ? 0 : price.hashCode());
        result = prime * result + ((capacity == null) ? 0 : capacity.hashCode());
        return result;
    }
    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Inventory other = (Inventory) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (quantity == null) {
            if (other.quantity != null)
                return false;
        } else if (!quantity.equals(other.quantity))
            return false;
        if (price == null) {
            if (other.price != null)
                return false;
        } else if (!price.equals(other.price))
            return false;
        if (capacity == null) {
            if (other.capacity != null)
                return false;
        } else if (!capacity.equals(other.capacity))
            return false;
        return true;
    }
    @Override
    public String toString() {
        return "Inventory [id=" + id + ", quantity=" + quantity + ", price=" + price + ", capacity=" + capacity + "]";
    }
    
    
    
    
}
