//use plp_bookstore

//switched to db plp_bookstore

//crud operations
db.books.find({ genre: "Fiction" })//task 2.1

db.books.find({ published_year: { $gt: 2000 } });//task 2.2

db.books.find({ author: "George Orwell" });//task 2.3

db.books.updateOne(
  { title: "Clean Code" },
  { $set: { price: 39.99 } }
);//task 2.4

db.books.deleteOne({ title: "Learning MongoDB" });//task 2.5


//advanced queries

db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
});//task 3.1


db.books.find(
  { genre: "Fiction" },
  { title: 1, author: 1, price: 1, _id: 0 }
);//task 3.2

db.books.find().sort({ price: 1 });//task 3.3 ascending
db.books.find().sort({ price: -1 });//task 3.3 descending


const page = 2;               // zero-based: 0 = page 1
const pageSize = 5;
db.books.find()
        .skip(page * pageSize)
        .limit(pageSize);//task 3.4


//aggregation pipeline
db.books.aggregate([
  { $group: { _id: "$Fiction", avgPrice: { $avg: "$price" } } }
]);//task 4.1

db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
]);//task 4.2

db.books.aggregate([
  {
    $group: {
      _id: {
        $subtract: [
          "$published_year",
          { $mod: ["$published_year", 10] }
        ]
      },
      count: { $sum: 1 }
    }
  },
  { $sort: { _id: 1 } }
]);//task 4.3


//indexing
db.books.createIndex({ title: 1 });//task 5.1

db.books.createIndex({ author: 1, published_year: 1 });//task 5.2

db.books.find({ title: "The Alchemist" }).explain("executionStats");//task 5.3


