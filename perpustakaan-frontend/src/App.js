import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import HomePage from "./pages/HomePage";
import KatalogPage from "./pages/KatalogPage";
import BookPage from "./pages/BookPage";
import MemberPage from "./pages/MemberPage";
import TransactionPage from "./pages/TransactionPage";

// Komponen untuk melindungi rute admin
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    // Jika belum login, alihkan ke halaman utama
    return <Navigate to="/" replace />;
  }
  return children;
}

function App() {
  // State untuk mengelola status login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State untuk menampilkan/menyembunyikan modal login
  const [showLoginModal, setShowLoginModal] = useState(false);
  // State untuk input form login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // State untuk pesan error login
  const [loginError, setLoginError] = useState("");

  // Fungsi untuk menangani proses login
  const handleLogin = (e) => {
    e.preventDefault();
    // Cek kredensial
    if (username === "admin" && password === "admin1234") {
      setIsLoggedIn(true);
      setShowLoginModal(false);
      setPassword("");
      setLoginError("");
    } else {
      setLoginError("Username atau password salah!");
    }
  };

  // proses logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Set status login menjadi false
  };

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Perpustakaan Digital
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/katalog">
                Katalog Buku
              </Nav.Link>
            </Nav>
            <Nav>
              {isLoggedIn ? (
                // Tampilan JIKA SUDAH LOGIN
                <>
                  <Nav.Link as={Link} to="/admin/books">
                    Buku
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/members">
                    Anggota
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admin/transactions">
                    Transaksi
                  </Nav.Link>
                  <Button
                    variant="outline-danger"
                    onClick={handleLogout}
                    className="ms-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                // Tampilan JIKA BELUM LOGIN
                <Button
                  variant="outline-success"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Form onSubmit={handleLogin}>
          <Modal.Header closeButton>
            <Modal.Title>Login Admin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loginError && <Alert variant="danger">{loginError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowLoginModal(false)}
            >
              Batal
            </Button>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <div className="mt-4">
        <Routes>
          {/* Rute Publik */}
          <Route path="/katalog" element={<KatalogPage />} />
          <Route path="/" element={<HomePage />} />

          {/* Rute Admin  */}
          <Route
            path="/admin/books"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <BookPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/members"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <MemberPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/transactions"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TransactionPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
