import { useQuery } from "@apollo/client";
import { getBooksQuery } from "../queries/queries";

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  const displayBooks = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (!data.books.length) return <p>There are no books in the database.</p>;

    return data.books.map((book) => <li key={book.id}>{book.name}</li>);
  };

  return <ul id="book-list">{displayBooks()}</ul>;
}

export default BookList;
