// src/components/MovieList.jsx
import MovieCard from './MovieCard';
import { TbMoodCry } from "react-icons/tb";

function MovieList({ movies }) {
  // Conditional rendering : si pas de films
  if (movies.length === 0) {
    return (
      <div className="alert alert-warning d-flex align-items-center gap-2">
        <TbMoodCry size={24} />
        <p className="mb-0">Aucun film trouvé.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">
        {movies.length} film{movies.length > 1 ? 's' : ''} trouvé{movies.length > 1 ? 's' : ''}
      </h2>
      <div className="row">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.year}
            rating={movie.rating}
            poster={movie.poster}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
