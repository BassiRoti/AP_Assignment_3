import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'Data', 'Movies.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    const director = data.directors.find(d => d.id === id);
    if (director) {
      const moviesByDirector = data.movies.filter(movie => movie.directorId === id);
      res.status(200).json({ ...director, movies: moviesByDirector });
    } else {
      res.status(404).json({ message: 'Director not found' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 