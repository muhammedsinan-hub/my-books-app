const Book = require('../models/Book');

// GET all books with pagination
exports.getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query; 
    const books = await Book.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Book.countDocuments();
    
    res.status(200).json({
      books,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page)
    });
  } catch (error) {
    next(error); 
  }
};

// POST a new book
exports.createBook = async (req, res, next) => {
  try {
    const { title, author, publishedDate } = req.body;
    if (!title || !author) {
      return res.status(400).json({ message: "Title and Author are required" });
    }
    const newBook = new Book({ title, author, publishedDate });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

// PUT (Update) a book
exports.updateBook = async (req, res, next) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

// GET book by ID
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};
// DELETE a book
exports.deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};