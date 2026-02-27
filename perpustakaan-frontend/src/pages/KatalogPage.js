import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import "../App.css";

function KatalogPage() {
  const [groupedBooks, setGroupedBooks] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/books?paginate=100",
        );
        const fetchedBooks = response.data.data.data;

        const groups = fetchedBooks.reduce((acc, book) => {
          const category = book.category || "Lainnya";
          if (!acc[category]) acc[category] = [];
          acc[category].push(book);
          return acc;
        }, {});
        setGroupedBooks(groups);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };
    fetchBooks();
  }, []);

  return (
    <Container className="my-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-indigo-700">📚 Katalog Perpustakaan</h1>
        <p className="text-muted">
          Temukan pengetahuan baru dari koleksi terbaik kami.
        </p>
      </div>

      {Object.keys(groupedBooks).map((category) => (
        <div key={category} className="mb-5">
          <h3 className="border-start border-primary border-4 ps-3 mb-4 fw-bold">
            {category}
          </h3>
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {groupedBooks[category].map((book) => (
              <Col key={book.id}>
                <Card className="h-100 card-hover shadow-sm rounded-4 overflow-hidden">
                  <div
                    style={{
                      height: "8px",
                      background: book.stock > 0 ? "#10b981" : "#ef4444",
                    }}
                  />
                  <Card.Body className="p-4">
                    <Card.Title className="fw-bold mb-2">
                      {book.title}
                    </Card.Title>
                    <Card.Subtitle className="text-primary mb-3">
                      {book.author}
                    </Card.Subtitle>
                    <Card.Text className="text-muted small">
                      Penerbit: {book.publisher}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-white border-0 p-4 pt-0 text-center">
                    <Badge
                      bg={book.stock > 0 ? "success" : "danger"}
                      className="px-3 py-2 rounded-pill w-100"
                    >
                      {book.stock > 0
                        ? `Tersedia: ${book.stock}`
                        : "Stok Habis"}
                    </Badge>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
}

export default KatalogPage;
