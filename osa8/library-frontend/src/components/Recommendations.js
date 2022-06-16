import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { ALL_BOOKS, GET_USER } from '../queries';

const Recommendations = ({ show }) => {
  const userResults = useQuery(GET_USER);
  const user = userResults.data;
  const [genre, setGenre] = useState('');
  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre,
    },
  });

  useEffect(() => {
    if (user?.me.favoriteGenre !== undefined) {
      setGenre(user.me.favoriteGenre);
    }
  }, [user]);

  if (books.loading || userResults.loading) {
    return <div>Loading...</div>;
  }

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        {' '}
        books in your favorite genre{' '}
        {userResults.data.me.favoriteGenre}
      </p>
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
      <div></div>
    </div>
  );
};

export default Recommendations;
