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
    private Integer id;
    
    private String productName;    //name of product
    private Integer size;       //how much space it takes up in warehouse
    public Product() {
    }
    
    public Product(Integer id, String productName, Integer size) {
        this.id = id;
        this.productName = productName;
        this.size = size;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
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
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        result = prime * result + ((productName == null) ? 0 : productName.hashCode());
        result = prime * result + ((size == null) ? 0 : size.hashCode());
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
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        if (productName == null) {
            if (other.productName != null)
                return false;
        } else if (!productName.equals(other.productName))
            return false;
        if (size == null) {
            if (other.size != null)
                return false;
        } else if (!size.equals(other.size))
            return false;
        return true;
    }
    
    
    
}
