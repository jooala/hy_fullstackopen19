import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS } from './queries';
import Recommendations from './components/Recommendations';

const App = () => {
  const [token, setToken] = useState(null);
  const [page, setPage] = useState('authors');
  const authors = useQuery(ALL_AUTHORS);
  const client = useApolloClient();

  if (authors.loading) {
    return <div>Loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Authors
          show={page === 'authors'}
          authors={authors.data.allAuthors}
        />

        <Books show={page === 'books'} />
        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>
          recommendations
        </button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors.data.allAuthors}
      />

      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommendations show={page === 'recommendations'} />
    </div>
  );
};

export default App;
