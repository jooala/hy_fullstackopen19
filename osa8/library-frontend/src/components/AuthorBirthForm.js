import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';
import Select from 'react-select';

const { useState } = require('react');

const AuthorBirthForm = ({ authors }) => {
  const [selectedName, setSelectedName] = useState('');
  const [setBornTo, setBorn] = useState('');

  const options = authors.map((a) => {
    return {
      value: a.name,
      label: a.name,
    };
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();
    const name = selectedName.value;
    console.log('updating author...');
    editAuthor({ variables: { name, setBornTo } });
    setSelectedName('');
    setBorn('');
  };

  return (
    <div>
      <h2>Update Author</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue={selectedName}
          onChange={setSelectedName}
          options={options}
        />
        <div>
          born
          <input
            value={setBornTo}
            type="number"
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorBirthForm;
