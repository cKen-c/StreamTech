// src/components/SearchBar.jsx
import { FaSearch } from "react-icons/fa";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-4">
      <div className="input-group input-group-lg">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un film..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default SearchBar;
