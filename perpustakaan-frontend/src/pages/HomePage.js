import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../App.css";

function HomePage() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="text-center p-5 main-container bg-white">
        <h1
          className="display-3 fw-extrabold text-indigo-700 mb-3"
          style={{ color: "#4f46e5" }}
        >
          📚 PERPUSTAKAAN XXI
        </h1>
        <p
          className="lead text-secondary mb-5 mx-auto"
          style={{ maxWidth: "600px" }}
        >
          Manajemen pinjam buku perpustakaan
        </p>
        <div className="d-flex justify-content-center">
          {/* Tombol Admin Portal sudah dihapus dari sini */}
          <Button
            as={Link}
            to="/katalog"
            variant="primary"
            size="lg"
            className="px-5 shadow-sm rounded-pill"
          >
            Mulai Jelajahi Katalog
          </Button>
        </div>
        <div className="mt-5 pt-4 border-top">
          <small className="text-muted">Elang Pratama - UKSW 2024</small>
        </div>
      </div>
    </Container>
  );
}

export default HomePage;
