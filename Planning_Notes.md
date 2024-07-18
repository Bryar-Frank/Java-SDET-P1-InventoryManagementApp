# Planning Notes
## Ideas, Questions, and Brainstorming

### Table Ideas
Warehouse_Identifier:
1. warehouse_id
2. warehouse_name
3. location
4. warehouse_capacity

Product_Identifier:
1. product_id
2. product_name
3. product_size - how much space it takes up in the factory
4. picture_link - link to a picture to display of product

Product_Table: (Primary Key - "warehouse_id + product_id")
1. warehouse_id - foreign_key --> Warehouse Identifier   
2. product_id   - foreign_key --> Product Identifier
3. quantity
4. max_capacity - *optional* capacity for that "warehouse/product" combo
5. price

Orders:
1. order_id
2. customer_name
3. date
5. 

Order_Lines:
1. order_id
2. order_line
3. product_id
4. quantity_sold
5. price_sold
6. warehouse_id
7. 


#### Questions

#### Things to Figure out