CREATE TABLE sales (
    order_id VARCHAR(255),
    customer_name VARCHAR(255),
    category VARCHAR(255),
    sub_category VARCHAR(255),
    city VARCHAR(255),
    order_date DATE,
    region VARCHAR(255),
    sales DECIMAL(10, 2),
    discount DECIMAL(10, 2),
    profit DECIMAL(10, 2)
);

-- Cargar los datos del CSV

LOAD DATA INFILE '../data/Supermart Grocery Sales - Retail Analytics Dataset.csv'
INTO TABLE sales
FIELDS TERMINATED BY ',' ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(order_id, customer_name, category, sub_category, city, @order_date, region, sales, discount, profit)
SET 
    order_date = STR_TO_DATE(@order_date, '%m/%d/%Y');