# Inventory Management

## Project 1
### Java-SDET Practice
####  Due 08/02/2024

#### Objective:

Create an inventory management solution that will enable an administrator at a given
company to manage the entities at any of its warehouses. The administrator should possess the
ability to view, add, remove, and alter any of the entities within that company’s warehouse(s).
The site should provide the administrative team with an easy portal to do their job so having
clear and concise UI/UX is paramount. The application should also take into consideration
possible edge cases such as warehouses having their own maximum capacity and handling the
addition of items that would cause the warehouse to exceed its capacity.

#### Functional Requirements:
 * Must be a full-stack solution consisting of:
   1. Java with Spring Boot
   2. PostgreSQL
   3. React
 * Code should be available to a public GitHub repository
 * Possesses all required CRUD functionality
 * Handles edge cases effectively
#### Non-Functional Requirements:
 * Well documented code
 * Code upholds industry best practices (SOLID/DRY)
 * Industry-Grade UI (User Interface)
 * Intuitive UX (User Experience)

# Planning Notes
## TODOs

### Postgress
    - DONE - Insert Item Table and Total Inventory Table
    - DONE - Insert Dummy Information into Item/Inventory Tables
    - DONE - Create Table Structure for Warehouse Table
    - DONE - Insert Dummy Information for Warehouse

### SpringBootApplication
    - DONE - Create Initial SpringBoot Application
    - DONE - Create Models for ProductInfo, WarehouseInfo, Inventory
    - DONE - Create Servers, Repositories, and Controllers for Inventory
    - DONE - Implement CRUD operations for request mapping
    - DONE - Test http requests and response body information for column joining
    - DONE - Test CRUD operations for GET, POST, PUT, DELETE
    
### Front End
    - DONE - Start Initial Design on Paper
    - DONE - Create REACT server(?) for page rendering
    - DONE - Mock up initial Design with Static Dummy Information
    - DONE - Get successful fetchs for inventory information

    - DONE - Get successful POST, PUT, and DELETE fetchs done
    - DONE- FIX ALL TODOS is React Structure
        + Homepage - List Warehouse/Inventory Options (+ sign for new Warehouse)
        + Warehouse Page - Warehouse Info with option to edit
        + New Item Form
        + New Warehouse Form
        + New Product Form
    - DONE - Make it look pretty!!



## Ideas

### Table Ideas
    Warehouse_Identifier: (Primary: warehouse_id)
        1. warehouse_id
        2. warehouse_name
        3. location
        4. warehouse_capacity

    Product_Identifier: (Primary: product_id)
        1. product_id
        2. product_name
        3. product_size - how much space it takes up in the factory
        4. picture_link - *optional*

    Inventory_Table: (Primary: warehouse_id + product_id)
        1. warehouse_id (foreign_key --> Warehouse Identifier)   
        2. product_id   (foreign_key --> Product Identifier)
        3. quantity
        4. max_capacity - *optional* item capacity for that "warehouse"
        5. price

#### Can Be Implemented Later after Initial Run
    Orders: (Primary: order_id)
        1. order_id
        2. customer_name
        3. date

    Order_Lines: (Primary: order_id + order_line)
        1. order_id (foreign key --> Orders)
        2. order_line
        3. warehouse_id (foreign key --> Warehouse_Identifier)
        4. product_id (foreign key --> Product_Identifier)
        5. quantity_sold
        6. price_sold
        *NOTE* (warehouse_id + product_id = foreign key --> product table)

