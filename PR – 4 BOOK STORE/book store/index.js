const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 8090;

app.use(express.json());


const db=async()=>{
    mongoose.connect("mongodb+srv://node:node-pr4@cluster0.y8xpr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    console.log('Connected to MongoDB Atlas');
}  

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  publicationYear: Number,
  price: Number,
  quantity: Number,
  description: String,
  imageUrl: String,
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);


app.get('/', (req, res) => {
  res.send('welcome to the book store');
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } 
  catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const validateBookData = (req, res, next) => {
    const { title, author, category, publicationYear, price, quantity, description, imageUrl } = req.body;
    if (!title || !author || !category || !publicationYear || !price || !quantity || !description || !imageUrl) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    next();
  };  

app.post('/books/addbooks', validateBookData, async (req, res) => {
  try {
   const books=await Book.create(req.body);
    res.status(200).json(books);
  }
   catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/books/book/:id', async (req, res) => {
    try{
        let {id}=req.params;
        const books=await Book.findById(id);
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
      }
    });
    

app.patch('/books/update/:id', async (req, res) => {
  try {
    let {id}=req.params;
    let books=await Book.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json(books);
  } 
  catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/books/delete/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletedBook = await Book.findByIdAndDelete(id);
      res.status(200).json(deletedBook);
    } 
    catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  app.get('/books/filter', async (req, res) => {
    try {
      let { author, category, title, price } = req.query;
      let filter = {};
  
      if (author){
        filter.author = author;
      } 
      if (category) {
        filter.category = category;
      }
      if (title) {
        filter.title =title; 
      }
  
      let books = await Book.find(filter); 
  

      if (price == 'lth') {
        books = books.sort((a, b) => a.price - b.price); 
      } else if (price == 'htl') {
        books = books.sort((a,b) => b.price - a.price); 
      }
       res.status(200).json(books);
  
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
  app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  db()
});
