// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Todos from './pages/Todos';
import Contact from './pages/Contact';


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={
            <div className="alert alert-warning mt-5">
              <h2>404 - Page non trouvée</h2>
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
