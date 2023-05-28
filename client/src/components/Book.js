import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";
import { useState } from "react";

function BookList() {
  const [book, setBook] = useState({ selected: null });
  const { loading, error, data } = useQuery(getBooksQuery);

  const displayBooks = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (!data.books.length) return <p>There are no books in the database.</p>;

    return data.books.map((book) => (
      <li key={book.id} onClick={(e) => setBook({selected: book.id})}>
        {book.name}
      </li>
    ));
  };

  return (
    <div>
      <ul id="book-list">{displayBooks()}</ul>
      <BookDetails bookId={book.selected}/>
    </div>
  );
}

export default BookList;
