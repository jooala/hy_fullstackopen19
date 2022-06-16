import { useState } from 'react';
import { ALL_BOOKS, ALL_GENRES } from '../queries';
import { useQuery } from '@apollo/client';

const Books = ({ show }) => {
  const [genre, setGenre] = useState('');
  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  });
  const genres = useQuery(ALL_GENRES);

  if (books.loading || genres.loading) {
    return <div>Loading...</div>;
  }

  const genresList = [
    ...new Set(genres.data.allBooks.map((b) => b.genres).flat()),
  ];

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genresList.map((g, index) => (
          <button key={index} onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setGenre('')}>Reset</button>
      </div>
    </div>
  );
};

export default Books;
