import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookForm = () => {
  const [book, setBook] = useState({ title: '', author: '', publishedDate: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/books', book);
      alert('Book Added Successfully!');
      navigate('/'); 
    } catch (err) {
      alert('Error adding book. Title and Author required!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 p-8 border border-amber-300 rounded-lg shadow-lg w-96'>
        <h2 className="text-xl font-bold text-center">Add New Book</h2>
        <input 
          className="border p-2 rounded" 
          type="text" 
          placeholder="Title" 
          value={book.title}
          onChange={(e) => setBook({...book, title: e.target.value})} 
          required 
        />
        <input 
          className="border p-2 rounded" 
          type="text" 
          placeholder="Author" 
          value={book.author}
          onChange={(e) => setBook({...book, author: e.target.value})} 
          required 
        />
        <input 
          className="border p-2 rounded" 
          type="date" 
          value={book.publishedDate}
          onChange={(e) => setBook({...book, publishedDate: e.target.value})} 
        />
        <button type="submit" className="bg-amber-500 text-white p-2 rounded font-bold hover:bg-amber-600">
          Save Book
        </button>
      </form>
    </div>
  );
};

export default BookForm;