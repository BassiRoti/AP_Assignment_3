import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'Data', 'Movies.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    const moviesInGenre = data.movies.filter(movie => movie.genreId === id);
    if (moviesInGenre.length > 0) {
      res.status(200).json(moviesInGenre);
    } else {
      // It's better to return an empty array if no movies match the genre, 
      // rather than a 404, unless the genre itself doesn't exist.
      // For simplicity, assuming genre ID always exists if movies are filtered.
      res.status(200).json([]); 
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 