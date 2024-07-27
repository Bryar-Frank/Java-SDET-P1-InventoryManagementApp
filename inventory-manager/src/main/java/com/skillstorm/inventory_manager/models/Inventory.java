package com.skillstorm.inventory_manager.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
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
@IdClass(InventoryCompositeKey.class)
public class Inventory {

    @Id @Column(name = "p_id")
    private Integer productId;

    @Id @Column(name = "w_id")
    private Integer warehouseId;

    // @OneToOne
    // @JoinColumn(name = "product_id", referencedColumnName = "product_id", insertable = false, updatable = false)
    // private Product product;

    // @OneToOne
    // @JoinColumn(name = "warehouse_id", referencedColumnName = "warehouse_id", insertable = false, updatable = false)
    // private Warehouse warehouse;

    private Integer quantity;
    private Double price;
    private Integer capacity;
    
    public Inventory() {
    }
    public Inventory(int productId, int warehouseId, int quantity, double price, int capacity) {
        this.productId = productId;
        this.warehouseId = warehouseId;
        this.quantity = quantity;
        this.price = price;
        this.capacity = capacity;
    }
   
    public Integer getProductId() {
        return productId;
    }
    public void setProductId(int productId) {
        this.productId = productId;
    }
    public Integer getWarehouseId() {
        return warehouseId;
    }
    public void setWarehouseId(int warehouseId) {
        this.warehouseId = warehouseId;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }
    public Integer getMaxCapacity() {
        return capacity;
    }
    public void setMaxCapacity(int capacity) {
        this.capacity = capacity;
    }
    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + productId;
        result = prime * result + warehouseId;
        result = prime * result + quantity;
        long temp;
        temp = Double.doubleToLongBits(price);
        result = prime * result + (int) (temp ^ (temp >>> 32));
        result = prime * result + capacity;
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
        if (productId != other.productId)
            return false;
        if (warehouseId != other.warehouseId)
            return false;
        if (quantity != other.quantity)
            return false;
        if (Double.doubleToLongBits(price) != Double.doubleToLongBits(other.price))
            return false;
        if (capacity != other.capacity)
            return false;
        return true;
    }
    @Override
    public String toString() {
        return "Inventory [productId=" + productId + ", warehouseId=" + warehouseId + ", quantity=" + quantity
                + ", price=" + price + ", maxCapacity=" + capacity + "]";
    }
    
    


}
