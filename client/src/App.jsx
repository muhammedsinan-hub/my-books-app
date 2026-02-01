import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BooksList from "./pages/BooksList";
import BookForm from "./pages/BookForm";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 no-scrollbar overflow-y-auto">
        
        <nav className="bg-white border-b border-gray-200 py-4 shadow-sm flex justify-center items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition-colors duration-300 border-b-2 border-transparent hover:border-blue-600 pb-1"
          >
            Books List
          </Link>
          <div className="h-6 w-[1px] bg-gray-300"></div>
          <Link
            to="/add"
            className="text-gray-700 font-semibold text-lg hover:text-blue-600 transition-colors duration-300 border-b-2 border-transparent hover:border-blue-600 pb-1"
          >
            Add Book
          </Link>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<BooksList />} />
            <Route path="/add" element={<BookForm />} />
            <Route path="/edit/:id" element={<BookForm />} />
          </Routes>
        </div>
        
      </div>
    </Router>
  );
}

export default App;