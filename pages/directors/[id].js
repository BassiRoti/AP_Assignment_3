import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Import Link for movie titles

export default function DirectorDetailPage() {
    const router = useRouter();
    const { id: directorId } = router.query;

    const [directorDetails, setDirectorDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!directorId) return; // Wait for directorId to be available

        async function fetchDirectorDetails() {
            try {
                setLoading(true);
                const response = await fetch(`/api/directors/${directorId}`);
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error('Director not found');
                    }
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setDirectorDetails(data);
            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch director details:", e);
            } finally {
                setLoading(false);
            }
        }

        fetchDirectorDetails();
    }, [directorId]);

    if (loading) return <p>Loading director details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!directorDetails) return <p>Director not found.</p>; // Should be covered by error state, but good practice

    return (
        <div>
            <h2>{directorDetails.name}</h2>
            {/* Add other director details if available, e.g., bio, birthdate etc. */}
            {/* For now, the API only returns id and name for the director object itself. */}
            
            <h3>Movies Directed:</h3>
            {directorDetails.movies && directorDetails.movies.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {directorDetails.movies.map(movie => (
                        <li key={movie.id} style={{ marginBottom: '15px', padding: '10px', border: '1px solid var(--button-border-color)', borderRadius: '4px' }}>
                            {/* Optionally link to movie detail page */}
                            {/* <Link href={`/movies/${movie.id}`}> */}
                            <h4 style={{marginTop: 0, color: 'var(--link-color)'}}>{movie.title}</h4>
                            {/* </Link> */}
                            <p><strong>Release Year:</strong> {movie.releaseYear}</p>
                            <p><strong>Rating:</strong> {movie.rating}</p>
                            <p><strong>Description:</strong> {movie.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movies found for this director.</p>
            )}
        </div>
    );
} 