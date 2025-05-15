import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function GenreMoviesPage() {
    const router = useRouter();
    const { id: genreId } = router.query;

    const [movies, setMovies] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [genreName, setGenreName] = useState(''); // Optional: Fetch genre name too
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!genreId) return; // Wait for genreId to be available

        async function fetchData() {
            try {
                setLoading(true);
                // Fetch movies by genre
                const moviesResponse = await fetch(`/api/genres/${genreId}/movies`);
                if (!moviesResponse.ok) {
                    throw new Error(`HTTP error! status: ${moviesResponse.status} for movies`);
                }
                const moviesData = await moviesResponse.json();
                setMovies(moviesData);

                // Fetch all directors (to map directorId to name)
                const directorsResponse = await fetch('/api/directors');
                if (!directorsResponse.ok) {
                    throw new Error(`HTTP error! status: ${directorsResponse.status} for directors`);
                }
                const directorsData = await directorsResponse.json();
                setDirectors(directorsData);
                
                // Optional: Fetch genre details to display genre name
                // const genreResponse = await fetch(`/api/genres/${genreId}`);
                // if (genreResponse.ok) {
                //     const genreData = await genreResponse.json();
                //     setGenreName(genreData.name);
                // }

            } catch (e) {
                setError(e.message);
                console.error("Failed to fetch genre data:", e);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [genreId]);

    const getDirectorName = (directorId) => {
        const director = directors.find((d) => d.id === directorId);
        return director ? director.name : "Director not found";
    };

    if (loading) return <p>Loading movies for genre...</p>;
    if (error) return <p>Error loading data: {error}</p>;
    if (!genreId) return <p>Loading genre information...</p>; // Handles case where genreId is not yet available

    return (
        <>
            <h2>Movies in Genre {genreName || genreId}</h2>
            {movies.length === 0 ? (
                <p>No movies found for this genre.</p>
            ) : (
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    {movies.map((val) => (
                        <div key={val.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid var(--button-border-color)', borderRadius: '4px' }}>
                            <h3 style={{marginTop: 0}}>{val.title}</h3>
                            <li>Description: {val.description}</li>
                            <li>Director: {getDirectorName(val.directorId)}</li>
                            <li>Release Year: {val.releaseYear}</li>
                            <li>Rating: {val.rating}</li>
                        </div>
                    ))}
                </ul>
            )}
        </>
    );
}

// Remove or comment out getServerSideProps if switching to client-side fetching
/*
export async function getServerSideProps(context) {
    const p=path.join(process.cwd(),'Data','Movies.json');
    const p2=await fs.readFile(p);
    const parsed_data=JSON.parse(p2);
    const data=parsed_data.movies;
    const data2=parsed_data.directors;
    const linkedid=context.params.id;

    const final_data = data.map(movie => ({
        id: movie.id,
        title: movie.title,
        directorId: movie.directorId,
        description: movie.description,
        releaseYear: movie.releaseYear,
        genreId: movie.genreId,
        rating: movie.rating,
      }));


      const final_data2=final_data.filter(val=>val.genreId===linkedid)
      const final_data3 = data2.map(val => ({
        id:val.id,
        name:val.name,
      }));

      return{
        props:{
            data:final_data2,
            data2:final_data3
        }
      }
}
*/

