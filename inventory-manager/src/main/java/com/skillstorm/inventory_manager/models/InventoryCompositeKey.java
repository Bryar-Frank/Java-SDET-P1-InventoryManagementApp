package com.skillstorm.inventory_manager.models;


import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class InventoryCompositeKey implements Serializable{
    @Column(name = "product_id", insertable = false, updatable = false)
    private int productId;

    @Column(name = "warehouse_id", insertable = false, updatable = false)
    private int warehouseId;

    public InventoryCompositeKey() {
    }

    public InventoryCompositeKey(int productId, int warehouseId) {
        this.productId = productId;
        this.warehouseId = warehouseId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(int warehouseId) {
        this.warehouseId = warehouseId;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + productId;
        result = prime * result + warehouseId;
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
        if (productId != other.productId)
            return false;
        if (warehouseId != other.warehouseId)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "InventoryCompositeKey [productId=" + productId + ", warehouseId=" + warehouseId + "]";
    }


}
