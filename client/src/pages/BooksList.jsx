import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/books?page=${page}`);
        setBooks(res.data.books);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Fetch Error:", err);
        setLoading(false);
      }
    };
    fetchBooks();
  }, [page]);


  const handleDelete = async (id) => {
    if (window.confirm("delete this book ?")) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setBooks(books.filter(book => book._id !== id));
        alert("Book deleted!");
      } catch (err) {
        alert("cant delete");
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`); 
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className='flex justify-center items-center flex-col m-auto'>
      <h2 className='text-2xl mt-10'>Book Collections</h2>
      <table className='w-full max-w-2xl text-center border mt-10'>
        <thead>
          <tr className="bg-gray-200">
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id} className="border-b">
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'N/A'}</td>
              <td>
                <button 
                  onClick={() => handleEdit(book._id)} 
                  className='text-blue-400 font-bold'
                > 
                  Edit 
                </button>
                <button 
                  onClick={() => handleDelete(book._id)} 
                  className='text-red-600 ml-3 font-bold'
                > 
                  Delete 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="mt-5">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
        <span className="mx-4"> Page {page} of {totalPages} </span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default BooksList;