# Planning Notes
## Ideas, Questions, and Brainstorming

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
    4. picture_link - link to a picture to display of product

    Inventory_Table: (Primary: warehouse_id + product_id)
    1. warehouse_id - foreign_key --> Warehouse Identifier   
    2. product_id   - foreign_key --> Product Identifier
    3. quantity
    4. max_capacity - *optional* capacity for that "warehouse/product" combo
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


#### Questions
