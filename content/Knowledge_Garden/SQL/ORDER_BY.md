---
title: "ORDER BY & TOP: Sorting and Limiting Results"
tag:
    - SQL
    - Beginner
    - Sorting
---

> After learning how to group and aggregate data with [GROUP BY](GROUP_BY), I realized that sometimes I need to sort my results or just focus on the top records. That's when `ORDER BY` and `TOP` (or `LIMIT`) became my go-to tools for making data more insightful and reports more readable!

---

## Why are `ORDER BY` and `TOP`/`LIMIT` important?

Before, I could only see raw data or grouped summaries. But what if I want to:

-   See the top 5 best-selling products?
-   Display the customer who spent the most?
-   Or simply sort my data by date or amount?

Sorting and limiting help me focus on what matters most and make my analysis more actionable.

---

## Basic Syntax

### Sorting results

```sql
SELECT column
FROM table
ORDER BY sort_column [ASC | DESC];
```

-   `ASC`: ascending (default)
-   `DESC`: descending

### Limiting the number of rows

-   **SQL Server:**
    ```sql
    SELECT TOP number_of_rows column
    FROM table
    ORDER BY column DESC;
    ```
-   **MySQL / PostgreSQL / SQLite:**
    ```sql
    SELECT column
    FROM table
    ORDER BY column DESC
    LIMIT number_of_rows;
    ```

---

## Common Use Cases & Real-World Examples

### Sort products by price (high to low)

```sql
SELECT product_name, list_price
FROM products
ORDER BY list_price DESC;
```

### Show the 10 earliest customer birthdays

```sql
SELECT TOP 10 name, birth_date
FROM customers
ORDER BY birth_date ASC;
```

### Top 5 orders with the highest sales amount

```sql
SELECT TOP 5 order_number, sales_amount
FROM sales
ORDER BY sales_amount DESC;
```

### Get the 3 most recent blog posts

```sql
SELECT title, published_at
FROM blog_posts
ORDER BY published_at DESC
LIMIT 3;
```

### Sort by multiple columns

```sql
SELECT order_id, customer_name, order_date
FROM orders
ORDER BY customer_name ASC, order_date DESC;
```

---

## Advanced: Pagination with LIMIT and OFFSET

When working with large datasets, you might want to show results page by page. Use `LIMIT` with `OFFSET` (MySQL, PostgreSQL, SQLite):

```sql
SELECT column
FROM table
ORDER BY column DESC
LIMIT 10 OFFSET 20; -- Skip the first 20 rows, then return 10 rows
```

**Example: Show page 2 of a leaderboard (10 results per page):**

```sql
SELECT player_name, score
FROM leaderboard
ORDER BY score DESC
LIMIT 10 OFFSET 10; -- Page 2: skip first 10, get next 10
```

---

## Some notes when using ORDER BY & LIMIT/TOP

-   Always use `ORDER BY` with `LIMIT` or `TOP` to get consistent results.
-   Sorting by columns with many duplicate values? Add a secondary sort column for stability.
-   For very large tables, sorting can be slow. Add indexes on columns you sort by often.

---

## Common mistakes I made (and how to fix them)

### Using LIMIT/TOP without ORDER BY

```sql
-- Wrong:
SELECT * FROM sales LIMIT 5;
-- May return different results each time
```

```sql
-- Correct:
SELECT * FROM sales ORDER BY sales_amount DESC LIMIT 5;
```

### Forgetting to sort by multiple columns

```sql
-- Wrong:
SELECT * FROM orders ORDER BY customer_name;
-- Orders with the same customer_name may appear in random order
```

```sql
-- Correct:
SELECT * FROM orders ORDER BY customer_name, order_date DESC;
```

### Not using indexes for large sorts

```sql
-- Wrong: Slow query on big tables
SELECT * FROM sales ORDER BY sales_amount DESC;
```

```sql
-- Correct: Add an index
CREATE INDEX idx_sales_amount ON sales(sales_amount);
SELECT * FROM sales ORDER BY sales_amount DESC;
```

---

## Exercises I practiced

-   [x] Top 10 customers by total spending
-   [x] 5 most recent orders
-   [x] Products sorted by name (A-Z)
-   [x] Top 3 employees with highest sales
-   [x] Paginate results for a leaderboard

---

## Conclusion & Key Takeaways

**ORDER BY** and **TOP/LIMIT** help me:

-   Focus on the most important data
-   Make reports and dashboards more useful
-   Work efficiently with large datasets

---

> **Next up:** I'll learn about [GROUP BY](GROUP_BY) to summarize and aggregate data – a must-have skill for powerful SQL analysis!
