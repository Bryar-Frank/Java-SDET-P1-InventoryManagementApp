package com.skillstorm.inventory_manager.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
@Table(name = "products")
public class Product {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;
    
    private String name;    //name of product
    private Integer size;       //how much space it takes up in warehouse
    
    
    public Integer getProductId() {
        return productId;
    }
    
    public Product(Integer productId, String name, Integer size) {
        this.productId = productId;
        this.name = name;
        this.size = size;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Integer getSize() {
        return size;
    }
    public void setSize(Integer size) {
        this.size = size;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + productId;
        result = prime * result + ((name == null) ? 0 : name.hashCode());
        result = prime * result + size;
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
        Product other = (Product) obj;
        if (productId != other.productId)
            return false;
        if (name == null) {
            if (other.name != null)
                return false;
        } else if (!name.equals(other.name))
            return false;
        if (size != other.size)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Product [id=" + productId + ", name=" + name + ", size=" + size + "]";
    }
    
}
