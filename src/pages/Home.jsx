// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import SearchBar from '../components/SearchBar';
import { getPopularMovies, searchMovies, getGenres, getMoviesByGenre } from '../services/tmdbApi';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  // Charger les films populaires et les genres au démarrage
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [popularMovies, genresList] = await Promise.all([
          getPopularMovies(),
          getGenres()
        ]);
        setMovies(popularMovies);
        setGenres(genresList);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les données');
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Recherche avec debounce
  useEffect(() => {
    if (searchTerm.trim() === '') {
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLoading(true);
        const results = await searchMovies(searchTerm);
        setMovies(results);
        setSelectedGenre(''); // Réinitialiser le genre sélectionné
        setError(null);
      } catch (err) {
        setError('Erreur lors de la recherche');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Filtrer par genre
  useEffect(() => {
    if (!selectedGenre) return;

    async function loadMoviesByGenre() {
      try {
        setLoading(true);
        const results = await getMoviesByGenre(selectedGenre);
        setMovies(results);
        setSearchTerm(''); // Réinitialiser la recherche
        setError(null);
      } catch (err) {
        setError('Erreur lors du filtrage');
      } finally {
        setLoading(false);
      }
    }

    loadMoviesByGenre();
  }, [selectedGenre]);

  const handleSearchChange = async (value) => {
    setSearchTerm(value);

    if (value.trim() === '') {
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setSelectedGenre('');
      } catch (err) {
        setError('Impossible de charger les films');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const resetFilters = async () => {
    setSearchTerm('');
    setSelectedGenre('');
    try {
      setLoading(true);
      const popularMovies = await getPopularMovies();
      setMovies(popularMovies);
    } catch (err) {
      setError('Impossible de charger les films');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Films Populaires</h1>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Filtre par genre */}
      <div className="mb-4 d-flex gap-2">
        <select
          className="form-select"
          value={selectedGenre}
          onChange={handleGenreChange}
          style={{ maxWidth: '300px' }}
        >
          <option value="">Tous les genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>

        {(searchTerm || selectedGenre) && (
          <button
            className="btn btn-outline-secondary"
            onClick={resetFilters}
          >
            Réinitialiser
          </button>
        )}
      </div>

      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {!loading && !error && (
        <>
          <p className="text-muted">
            {searchTerm && `Résultats pour "${searchTerm}"`}
            {selectedGenre && `Films du genre : ${genres.find(g => g.id === parseInt(selectedGenre))?.name}`}
            {!searchTerm && !selectedGenre && 'Films populaires'}
          </p>
          <MovieList movies={movies} />
        </>
      )}
    </div>
  );
}

export default Home;
