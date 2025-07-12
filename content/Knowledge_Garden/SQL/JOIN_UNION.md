---
title: "JOIN & UNION: Combining Data Like a Pro"
tag:
  - SQL
  - Beginner
  - JOIN
  - UNION
---

> After mastering how to limit results with [TOP & LIMIT](TOP_LIMIT), I realized that in real-world scenarios, data rarely lives in a single table. That's when `JOIN` and `UNION` became essential tools for combining data from multiple sources!

---

## Why are JOIN and UNION important?

Previously, I could only work with individual tables. But what if I want to:
- Get order details along with customer names?
- Merge sales data from multiple years?
- Combine information from different branches?
- Create summary reports from various sources?

JOIN and UNION help me connect the pieces of data together for a more complete view.

---

## Basic Syntax

### JOIN – Combine data by columns
```sql
SELECT A.column, B.column
FROM table_A A
JOIN table_B B ON A.key = B.key;
```

### UNION – Combine data by rows
```sql
SELECT column1, column2 FROM table_A
UNION
SELECT column1, column2 FROM table_B;
```

---

## Common JOIN Types & Real-World Examples

### INNER JOIN – Only matching data
```sql
SELECT s.order_number, c.customer_name, c.city
FROM sales s
INNER JOIN customers c ON s.customer_key = c.customer_key;
```

### LEFT JOIN – Keep all data from the left table
```sql
SELECT s.order_number, st.store_name, st.square_meters
FROM sales s
LEFT JOIN stores st ON s.store_key = st.store_key;
```

### RIGHT JOIN – Keep all data from the right table
```sql
SELECT p.product_name, c.category_name
FROM products p
RIGHT JOIN categories c ON p.category_id = c.category_id;
```

### FULL JOIN – Keep all data from both tables
```sql
SELECT e.employee_name, d.department_name
FROM employees e
FULL JOIN departments d ON e.department_id = d.department_id;
```

### Joining multiple tables at once
```sql
SELECT o.order_number, c.customer_name, p.product_name, od.quantity
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_details od ON o.order_id = od.order_id
INNER JOIN products p ON od.product_id = p.product_id;
```

---

## UNION vs UNION ALL: The Key Difference

### UNION – Removes duplicate rows
```sql
SELECT customer_name, city FROM customers WHERE city = 'Hanoi'
UNION
SELECT customer_name, city FROM customers WHERE city = 'Danang';
```

### UNION ALL – Keeps all rows (including duplicates)
```sql
SELECT order_number FROM sales WHERE YEAR(order_date) = 2023
UNION ALL
SELECT order_number FROM sales WHERE YEAR(order_date) = 2024;
```

### Merging results from multiple complex queries
```sql
-- Top 5 customers by different criteria
SELECT 'Top Spender' as category, customer_name, total_amount
FROM customer_summary
ORDER BY total_amount DESC
LIMIT 5

UNION ALL

SELECT 'Most Orders' as category, customer_name, order_count
FROM customer_summary
ORDER BY order_count DESC
LIMIT 5;
```

---

## Notes when using JOIN & UNION

### With JOIN:
- Always check the ON condition to avoid incorrect results
- Use aliases (A, B) for better readability
- Be mindful of performance when joining large tables

### With UNION:
- All queries must have the same number of columns
- Column data types must be compatible
- Column names are taken from the first query

---

## Common mistakes I made (and how to fix them)

### Forgetting the ON condition in JOIN
```sql
-- Wrong: Creates a Cartesian product
SELECT * FROM sales s, customers c;
```
```sql
-- Correct: Always use an ON condition
SELECT * FROM sales s
INNER JOIN customers c ON s.customer_key = c.customer_key;
```

### UNION with different column structures
```sql
-- Wrong: Different number of columns
SELECT customer_name FROM customers
UNION
SELECT product_name, price FROM products;
```
```sql
-- Correct: Same number of columns
SELECT customer_name, 'Customer' as type FROM customers
UNION
SELECT product_name, 'Product' as type FROM products;
```

### Not using aliases when joining
```sql
-- Wrong: Hard to read and may cause errors
SELECT order_number, customer_name 
FROM sales 
INNER JOIN customers ON sales.customer_key = customers.customer_key;
```
```sql
-- Correct: Use aliases
SELECT s.order_number, c.customer_name 
FROM sales s
INNER JOIN customers c ON s.customer_key = c.customer_key;
```

---

## Exercises I practiced
- [x] Get order details with customer names
- [x] Merge sales data from two years
- [x] JOIN 3 tables: orders, customers, products
- [x] Compare UNION vs UNION ALL
- [x] Create summary reports from multiple sources

---

## Conclusion & Key Takeaways

**JOIN** and **UNION** help me:
- Combine data from multiple tables flexibly
- Create complex and detailed reports
- Work efficiently with relational databases
- Greatly expand my data analysis capabilities

> **Next up:** I'll dive deeper into advanced JOINs and subqueries to unlock even more SQL power!
