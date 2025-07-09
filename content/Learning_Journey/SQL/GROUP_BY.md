---
title: "GROUP BY: From Raw Data to Meaningful Statistics"
tag:
  - SQL
  - Beginner
---

> After getting comfortable with [`SELECT`](SELECT_and_FROM),[`FROM`](SELECT_and_FROM) and [`WHERE`](WHERE), I started wondering: "How can I not only retrieve data, but also analyze, summarize, and extract insights from thousands of rows?" That's when I discovered `GROUP BY` – the tool that transforms raw data into meaningful statistics!

---

## Why is `GROUP BY` important?

Before, I only knew how to filter data with `WHERE`, but when I needed to answer questions like:

- **Which store has the highest sales?**
- **Which month has the most orders?**
- **Which product is bought the most?**

`GROUP BY` became my "weapon" for summarizing and analyzing data!

---

## Basic `GROUP BY` Syntax

```sql
SELECT column1, AGG_FUNC(column2)
FROM table_name
WHERE condition
GROUP BY column1;
```

**Explanation:**

- `column1`: The column to group by
- `AGG_FUNC`: Aggregate function like COUNT, SUM, AVG, MIN, MAX

---

## Common Aggregate Functions

| Function  | Purpose           | Example usage               |
| --------- | ----------------- | --------------------------- |
| `COUNT()` | Count rows        | `COUNT(*)` counts all rows  |
| `SUM()`   | Calculate total   | `SUM(sales_amount)` revenue |
| `AVG()`   | Calculate average | `AVG(quantity)` average     |
| `MIN()`   | Minimum value     | `MIN(price)` lowest price   |
| `MAX()`   | Maximum value     | `MAX(price)` highest price  |

---

## Real-World Examples I Practiced

### **Example 1: Total revenue by store**

```sql
SELECT store_name, SUM(sales_amount) AS total_revenue
FROM sales
GROUP BY store_name;
```

### **Example 2: Number of orders by month**

```sql
SELECT MONTH(order_date) AS month, COUNT(order_id) AS total_orders
FROM orders
WHERE YEAR(order_date) = 2024
GROUP BY MONTH(order_date);
```

### **Example 3: Customer behavior analysis**

```sql
SELECT customer_name, COUNT(order_id) AS order_count, SUM(total_amount) AS total_spent
FROM orders
GROUP BY customer_name;
```

### **Example 4: Average quantity per product**

```sql
SELECT product_name, AVG(quantity) AS avg_quantity, COUNT(*) AS times_ordered
FROM order_details
GROUP BY product_name;
```

---

## Combining `WHERE` and `GROUP BY`

```sql
SELECT store_name, SUM(sales_amount) AS q4_revenue
FROM sales
WHERE order_date BETWEEN '2024-10-01' AND '2024-12-31'
GROUP BY store_name;
```

> **Note:** WHERE is always executed **before** GROUP BY to filter the necessary data

---

##  Advanced Examples

### Multi-Dimensional Analysis

```sql
-- Revenue by store and month
SELECT
    store_name,
    MONTH(order_date) AS month,
    SUM(sales_amount) AS monthly_revenue
FROM sales
WHERE YEAR(order_date) = 2024
GROUP BY store_name, MONTH(order_date);
```

### Top 5 Best-Selling Products

```sql
-- Top 5 products by revenue
SELECT
    product_name,
    SUM(quantity * price) AS total_revenue,
    COUNT(*) AS times_sold
FROM order_details
GROUP BY product_name
LIMIT 5;
```

### Employee Performance Analysis

```sql
-- Average sales per employee by month
SELECT
    employee_name,
    MONTH(sale_date) AS month,
    AVG(sale_amount) AS avg_sale,
    COUNT(*) AS total_sales
FROM sales
GROUP BY employee_name, MONTH(sale_date);
```

---

## Some notes when using GROUP BY

- All columns in SELECT (except aggregate functions) must be in GROUP BY
- Use WHERE only to filter data before grouping
- Create indexes for columns frequently used in GROUP BY to improve performance

---

---

## Common mistakes I made (and how to fix them)

### **Forgetting to include columns in GROUP BY**

```sql
-- Wrong:
SELECT customer_name, city, COUNT(order_id)
FROM orders
GROUP BY customer_name;
-- Error: city must be in GROUP BY
```

```sql
-- Correct:
SELECT customer_name, city, COUNT(order_id)
FROM orders
GROUP BY customer_name, city;
```

### **Using WHERE with aggregate functions**

```sql
-- Wrong:
SELECT customer_name, COUNT(order_id)
FROM orders
WHERE COUNT(order_id) > 5
GROUP BY customer_name;
-- Error: Cannot use WHERE with aggregate functions
```

```sql
-- Correct: Use HAVING or filter after GROUP BY
SELECT customer_name, COUNT(order_id)
FROM orders
GROUP BY customer_name
HAVING COUNT(order_id) > 5;
```

### **Grouping NULL values**

```sql
-- Wrong: NULL will be a separate group
SELECT region, COUNT(*)
FROM customers
GROUP BY region;
```

```sql
-- Correct: Handle NULL explicitly
SELECT COALESCE(region, 'Unknown') AS region, COUNT(*)
FROM customers
GROUP BY COALESCE(region, 'Unknown');
```

### **Grouping by timestamp instead of date**

```sql
-- Wrong: Groups by each timestamp
SELECT order_date, COUNT(*)
FROM orders
GROUP BY order_date;
```

```sql
-- Correct: Group by date only
SELECT DATE(order_date) AS order_day, COUNT(*)
FROM orders
GROUP BY DATE(order_date);
```

### **Slow queries due to missing index**

```sql
-- Wrong: No index
SELECT category, AVG(price)
FROM products
GROUP BY category;
```

```sql
-- Correct: Create index first
CREATE INDEX idx_category ON products(category);
SELECT category, AVG(price)
FROM products
GROUP BY category;
```

---

## Exercises set I completed

- [x] Total revenue and order count by city
- [x] Average revenue by day of the week
- [x] Customer segmentation by total spending
- [x] Number of orders by hour of the day
- [x] Top 10 products with highest profit

---


### **Exercise 1: Monthly Sales Trend Analysis**

```sql
-- Analyze sales trends by month for 2024
SELECT
    MONTH(order_date) AS month,
    MONTHNAME(order_date) AS month_name,
    COUNT(order_id) AS total_orders,
    SUM(total_amount) AS monthly_revenue
FROM orders
WHERE YEAR(order_date) = 2024
GROUP BY MONTH(order_date), MONTHNAME(order_date);
```

**Result:**

```
1 | January   | 1,250 | $125,000
2 | February  | 1,180 | $118,000
3 | March     | 1,420 | $142,000
4 | April     | 1,350 | $135,000
```

### **Exercise 2: Monthly Sales Trend Analysis**

```sql
-- Analyze sales trends by month for 2024
SELECT
    MONTH(order_date) AS month,
    MONTHNAME(order_date) AS month_name,
    COUNT(order_id) AS total_orders,
    SUM(total_amount) AS monthly_revenue
FROM orders
WHERE YEAR(order_date) = 2024
GROUP BY MONTH(order_date), MONTHNAME(order_date);
```

**Result:**

```
1 | January   | 1,250 | $125,000
2 | February  | 1,180 | $118,000
3 | March     | 1,420 | $142,000
4 | April     | 1,350 | $135,000
```

### **Exercise 3: Customer Loyalty Analysis**

```sql
-- Identify customer segments by purchase frequency
SELECT
    CASE
        WHEN COUNT(order_id) >= 10 THEN 'VIP Customer'
        WHEN COUNT(order_id) >= 5 THEN 'Regular Customer'
        ELSE 'New Customer'
    END AS customer_segment,
    COUNT(DISTINCT customer_id) AS customer_count,
    AVG(total_amount) AS avg_order_value
FROM orders
GROUP BY
    CASE
        WHEN COUNT(order_id) >= 10 THEN 'VIP Customer'
        WHEN COUNT(order_id) >= 5 THEN 'Regular Customer'
        ELSE 'New Customer'
    END;
```

**Result:**

```
VIP Customer     | 156 | $180.50
Regular Customer | 423 | $125.20
New Customer     | 1,234 | $85.30
```

### **Exercise 4: Seasonal Sales Pattern**

```sql
-- Analyze sales patterns by quarter
SELECT
    QUARTER(order_date) AS quarter,
    CASE
        WHEN QUARTER(order_date) = 1 THEN 'Q1 (Jan-Mar)'
        WHEN QUARTER(order_date) = 2 THEN 'Q2 (Apr-Jun)'
        WHEN QUARTER(order_date) = 3 THEN 'Q3 (Jul-Sep)'
        ELSE 'Q4 (Oct-Dec)'
    END AS quarter_name,
    COUNT(order_id) AS total_orders,
    SUM(total_amount) AS quarterly_revenue,
    AVG(total_amount) AS avg_order_value
FROM orders
WHERE YEAR(order_date) = 2024
GROUP BY QUARTER(order_date);
```

**Result:**

```
1 | Q1 (Jan-Mar) | 3,850 | $385,000 | $100.00
2 | Q2 (Apr-Jun) | 4,200 | $462,000 | $110.00
3 | Q3 (Jul-Sep) | 3,950 | $434,500 | $110.00
4 | Q4 (Oct-Dec) | 4,800 | $576,000 | $120.00
```

---

## Conclusion & Key Takeaways

**GROUP BY** helps me:

- Summarize and analyze data by groups
- Discover trends and compare groups
- Create professional summary reports

> **Next up:** I'll learn about JOIN to connect multiple tables – an essential skill for real-world SQL!
