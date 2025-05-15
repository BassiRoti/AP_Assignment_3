import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoading(true);
        const response = await fetch('/api/movies');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch movies:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchMovies();
  }, []);

  if (loading) return <p>Loading movies...</p>;
  if (error) return <p>Error loading movies: {error}</p>;

  return (
    <div>
      <h2>All Movies</h2>
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {movies.map(movie => (
            <li key={movie.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid var(--button-border-color)', borderRadius: '4px' }}>
              {/* Make title a link to the movie detail page if you have one, e.g., /movies/[id] */}
              {/* For now, just displaying title. You might want to create pages/movies/[id].js */}
              <h3 style={{ marginTop: 0 }}>{movie.title}</h3>
              <p><strong>Description:</strong> {movie.description}</p>
              <p><strong>Release Year:</strong> {movie.releaseYear}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
              {/* You might want to fetch director details separately if needed */}
              {/* <p><strong>Director ID:</strong> {movie.directorId}</p> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 