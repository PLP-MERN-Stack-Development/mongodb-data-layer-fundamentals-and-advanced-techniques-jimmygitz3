📘 MongoDB Compass Guide for plp_bookstore
This guide walks you through executing CRUD operations, advanced queries, aggregation pipelines, and indexing tasks using MongoDB Compass for the plp_bookstore database.

🧰 Prerequisites
- MongoDB Compass installed: Download here
- MongoDB server running locally or MongoDB Atlas cluster set up
- Connection string (e.g., mongodb://localhost:27017 or Atlas URI)

🔗 Step 1: Connect to MongoDB
- Open MongoDB Compass.
- Paste your connection string into the "Paste your connection string" field.
- Click Connect.

📂 Step 2: Create Database and Collection
- Click "Create Database".
- Name the database: plp_bookstore
- Name the collection: books
- Click Create Database

📥 Step 3: Insert Documents
- Open the books collection.
- Click "Add Data" → "Insert Document"
- Paste your book document JSON (e.g., from insert_books.js)
- Repeat or use "Insert Many" for bulk insertion

🛠️ Step 4: Run CRUD Operations
Go to the "Filter" bar in the books collection and enter:
Task 2: Basic Queries
- Find books by genre
{ "genre": "Fiction" }
-- Find books published after 2000
{ "published_year": { "$gt": 2000 } }
- Find books by George Orwell
{ "author": "George Orwell" }
- Update price of "Clean Code"
- Click the pencil icon next to the document
- Change price to 39.99
- Click Update
- Delete "Learning MongoDB"
- Find the document
- Click the trash icon

🔍 Step 5: Advanced Queries
 - Books in stock and published after 2010
{ "in_stock": true, "published_year": { "$gt": 2010 } }
- Projection: title, author, price
- Use Project tab:
{ "title": 1, "author": 1, "price": 1, "_id": 0 }
- Sort by price
- Ascending: click column header or use sort:
{ "price": 1 }
- Descending:
{ "price": -1 }
- Pagination (Page 3, 5 items per page)
- Use Skip: 10
- Use Limit: 5

📊 Step 6: Aggregation Pipelines
Go to the Aggregation tab and paste each stage:
- Average price by genre
[
  { "$group": { "_id": "$genre", "avgPrice": { "$avg": "$price" } } }
]
- 
- Author with most books
[
  { "$group": { "_id": "$author", "bookCount": { "$sum": 1 } } },
  { "$sort": { "bookCount": -1 } },
  { "$limit": 1 }
]
- Group by publication decade
[
  {
    "$group": {
      "_id": {
        "$subtract": [
          "$published_year",
          { "$mod": ["$published_year", 10] }
        ]
      },
      "count": { "$sum": 1 }
    }
  },
  { "$sort": { "_id": 1 } }
]

⚡ Step 7: Indexing
Go to the Indexes tab:
- Create index on title
- Field: title
- Type: Ascending
- Compound index on author and published_year
- Fields: author (asc), published_year (asc)
- Explain query performance
- Go to Documents
- Run:
{ "title": "The Alchemist" }
- Click Explain Plan

