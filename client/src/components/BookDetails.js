import { useQuery } from "@apollo/client";
import { getBookDetails } from "../queries/queries";
import Spinner from './Spinner';

function BookDetails(props) {
  const { data, loading } = useQuery(getBookDetails, {
    variables: { id: props.bookId },
  });

    if (loading) return <Spinner />

  const showBookDetails = () => {
    if (data) {
      const book = data.book;
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No book selected...</div>;
    }
  };

  return <div id="book-details">{showBookDetails()}</div>;
}

export default BookDetails;
