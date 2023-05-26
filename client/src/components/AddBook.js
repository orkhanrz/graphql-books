import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";

import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

function AddBook() {
  const [book, setBook] = useState({ name: "", genre: "", authorId: "" });
  const [addBook] = useMutation(addBookMutation);
  const { data, loading } = useQuery(getAuthorsQuery);

  const displayAuthors = () => {
    if (loading) return <option>Authors are loading...</option>;

    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const inputHandler = (e) => {
    setBook((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const submitForm = (e) => {
    console.log(book);
    e.preventDefault();

    addBook({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
    setBook({ name: "", genre: "", authorId: "" });
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label htmlFor="name">Book name: </label>
        <input
          type="text"
          name="name"
          value={book.name}
          onChange={inputHandler}
        />
      </div>
      <div className="field">
        <label htmlFor="genre">Genre: </label>
        <input
          type="text"
          name="genre"
          value={book.genre}
          onChange={inputHandler}
        />
      </div>
      <div className="field">
        <label htmlFor="authorId">Author:</label>
        <select name="authorId" onChange={inputHandler}>
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
