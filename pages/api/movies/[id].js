import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'Data', 'Movies.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    const movie = data.movies.find(m => m.id === id);
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 