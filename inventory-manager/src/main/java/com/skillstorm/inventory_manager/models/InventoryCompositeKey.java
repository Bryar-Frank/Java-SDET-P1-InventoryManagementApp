package com.skillstorm.inventory_manager.models;


import java.io.Serializable;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;

@Embeddable
public class InventoryCompositeKey implements Serializable{
    
    @ManyToOne @NotNull
    @Cascade({CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "p_id", referencedColumnName = "id")
    private Product product;

    @ManyToOne @NotNull
    @Cascade({CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "w_id", referencedColumnName = "id")
    private Warehouse warehouse;

    public InventoryCompositeKey() {
    }

    public InventoryCompositeKey(@NotNull Product product, @NotNull Warehouse warehouse) {
        this.product = product;
        this.warehouse = warehouse;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((product == null) ? 0 : product.hashCode());
        result = prime * result + ((warehouse == null) ? 0 : warehouse.hashCode());
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
        InventoryCompositeKey other = (InventoryCompositeKey) obj;
        if (product == null) {
            if (other.product != null)
                return false;
        } else if (!product.equals(other.product))
            return false;
        if (warehouse == null) {
            if (other.warehouse != null)
                return false;
        } else if (!warehouse.equals(other.warehouse))
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "InventoryCompositeKey [product=" + product + ", warehouse=" + warehouse + "]";
    }


}
