import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DirectorsPage() {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDirectors() {
      try {
        setLoading(true);
        const response = await fetch('/api/directors');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDirectors(data);
      } catch (e) {
        setError(e.message);
        console.error("Failed to fetch directors:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchDirectors();
  }, []);

  if (loading) return <p>Loading directors...</p>;
  if (error) return <p>Error loading directors: {error}</p>;

  return (
    <div>
      <h2>All Directors</h2>
      {directors.length === 0 ? (
        <p>No directors found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {directors.map(director => (
            <li key={director.id} style={{ marginBottom: '10px', padding: '8px', border: '1px solid var(--button-border-color)', borderRadius: '4px' }}>
              <Link href={`/directors/${director.id}`} style={{ textDecoration: 'none' }}>
                <h3 style={{ margin: 0, color: 'var(--link-color)' }}>{director.name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 