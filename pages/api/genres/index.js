import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const filePath = path.join(process.cwd(), 'Data', 'Movies.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    res.status(200).json(data.genres);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 