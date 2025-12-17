import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

function MovieCard({ id, title, year, rating, poster }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = (e) => {
    e.preventDefault(); // Empêche la navigation vers le détail du film
    if (isLiked) {
      setLikes((prev) => Math.max(prev - 1, 0));
      setIsLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="col-md-3 mb-4">
      <Link
        to={`/movie/${id}`}
        className="text-decoration-none text-dark"
      >
        <div className="card h-100 hover-card">
          <img
            src={poster}
            className="card-img-top"
            alt={title}
            style={{ height: "400px", objectFit: "cover" }}
          />

          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{title}</h5>

            <p className="card-text d-flex align-items-center gap-2 mb-3">
              <span className="badge bg-primary">{year}</span>

              <span className="badge bg-warning d-inline-flex align-items-center gap-1">
                <FaStar color="gold" />
                {rating}/10
              </span>
            </p>

            <button
              className={`btn btn-sm mt-auto d-flex align-items-center justify-content-center gap-2 ${
                isLiked ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={handleLike}
            >
              {isLiked ? <FaHeart /> : <FaRegHeart />}
              {likes} like{likes !== 1 && "s"}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
