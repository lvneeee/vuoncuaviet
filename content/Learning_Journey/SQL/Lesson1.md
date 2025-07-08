---
title: "My First SQL Concepts: SELECT and FROM"
---

> Every SQL query starts with two fundamental components: `SELECT` and `FROM`. Think of it like asking a librarian: "I want to see (`SELECT`) specific information from (`FROM`) this particular book (`TABLE`)."

---

### The Basic Syntax

The most basic query retrieves specific columns from a single table.

```sql
SELECT column1, column2, column3
FROM table_name;
```

**Breaking this down:**
-   **`SELECT`**: Tells the database which columns (fields) you want to see.
-   **`FROM`**: Specifies which table contains the data you need.
-   **Semicolon (`;`)**: Marks the end of your query. This is standard in many SQL database systems.

---

### Selecting All Columns

If you want to see all columns in a table without typing them all out, you can use the asterisk (`*`) wildcard.

```sql
SELECT *
FROM table_name;
```

**Warning:** While convenient, using `SELECT *` in production code is often discouraged. It can be inefficient as it may retrieve more data than necessary, and it can make your query less readable and more fragile if the table structure changes.

---

### A Concrete Example

Let's imagine we have a table named `Customers` with the following data:

| CustomerID | CustomerName      | City    | Country |
|------------|-------------------|---------|---------|
| 1          | Alfreds Futterkiste | Berlin  | Germany |
| 2          | Ana Trujillo      | México D.F. | Mexico  |
| 3          | Antonio Moreno    | México D.F. | Mexico  |
| 4          | Thomas Hardy      | London  | UK      |

To get the names and cities of all customers, our query would be:

```sql
SELECT CustomerName, City
FROM Customers;
```

**Result:**

| CustomerName      | City    |
|-------------------|---------|
| Alfreds Futterkiste | Berlin  |
| Ana Trujillo      | México D.F. |
| Antonio Moreno    | México D.F. |
| Thomas Hardy      | London  |
