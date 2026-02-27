import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Toast,
  ToastContainer,
  Badge,
  Card,
} from "react-bootstrap";
import "../App.css";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState({
    id: null,
    title: "",
    author: "",
    publisher: "",
    category: "Umum",
    publication_year: "",
    stock: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "light",
  });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const categories = [
    "Fiksi",
    "Non-Fiksi",
    "Sains",
    "Sejarah",
    "Komputer & Teknologi",
    "Pengembangan Diri",
    "Umum",
  ];

  // untuk warna badge kategori
  const getBadgeColor = (cat) => {
    const colors = {
      Sains: "info",
      Fiksi: "primary",
      "Komputer & Teknologi": "dark",
      Sejarah: "warning",
      "Pengembangan Diri": "success",
    };
    return colors[cat] || "secondary";
  };

  //  DATA FETCHING
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/books");
      setBooks(response.data.data.data);
    } catch (error) {
      console.error("Gagal mengambil data buku:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
  };

  // === HANDLERS (Tetap Sama) ===
  const handleCloseAddEditModal = () => {
    setShowAddEditModal(false);
    setError(null);
  };
  const handleShowAddModal = () => {
    setIsEditing(false);
    setCurrentBook({
      id: null,
      title: "",
      author: "",
      publisher: "",
      category: "Umum",
      publication_year: "",
      stock: "",
    });
    setShowAddEditModal(true);
  };
  const handleShowEditModal = (book) => {
    setIsEditing(true);
    setCurrentBook(book);
    setShowAddEditModal(true);
  };
  const handleFormChange = (e) => {
    setCurrentBook({ ...currentBook, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const url = isEditing
      ? `http://127.0.0.1:8000/api/books/${currentBook.id}`
      : "http://127.0.0.1:8000/api/books";
    const method = isEditing ? "put" : "post";
    const successMessage = isEditing
      ? "Data buku berhasil diperbarui!"
      : "Data buku berhasil ditambahkan!";
    try {
      await axios[method](url, currentBook);
      setIsLoading(false);
      handleCloseAddEditModal();
      fetchBooks();
      showNotification(successMessage, "success");
    } catch (error) {
      setIsLoading(false);
      setError("Gagal menyimpan data. Pastikan semua kolom terisi.");
    }
  };

  const handleShowConfirmDeleteModal = (book) => {
    setItemToDelete(book);
    setShowConfirmModal(true);
  };
  const handleCloseConfirmDeleteModal = () => {
    setItemToDelete(null);
    setShowConfirmModal(false);
  };
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/books/${itemToDelete.id}`);
      fetchBooks();
      showNotification("Data buku berhasil dihapus!", "success");
    } catch (error) {
      showNotification("Gagal menghapus buku.", "danger");
    } finally {
      handleCloseConfirmDeleteModal();
    }
  };

  // RENDER COMPONENT
  return (
    <Container className="mt-5 pb-5">
      {}
      <Card className="shadow-sm border-0 rounded-4 mb-4">
        <Card.Body className="d-flex justify-content-between align-items-center p-4">
          <div>
            <h2 className="fw-bold text-primary mb-1">📚 Koleksi Buku</h2>
            <p className="text-muted mb-0 small">
              Kelola data buku perpustakaan Anda secara real-time
            </p>
          </div>
          <Button
            variant="primary"
            className="rounded-pill px-4 shadow-sm fw-bold"
            onClick={handleShowAddModal}
          >
            + Tambah Buku Baru
          </Button>
        </Card.Body>
      </Card>

      {}
      <div className="bg-white shadow-sm rounded-4 overflow-hidden border">
        <Table hover responsive className="mb-0 align-middle">
          <thead className="bg-light">
            <tr className="text-secondary small text-uppercase">
              <th className="px-4 py-3 border-0">Judul & Penulis</th>
              <th className="border-0">Penerbit</th>
              <th className="border-0">Kategori</th>
              <th className="border-0 text-center">Tahun</th>
              <th className="border-0 text-center">Stok</th>
              <th className="border-0 text-end px-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="border-top-0">
            {books.map((book) => (
              <tr key={book.id}>
                <td className="px-4 py-3">
                  <div className="fw-bold text-dark">{book.title}</div>
                  <div className="small text-muted">{book.author}</div>
                </td>
                <td>{book.publisher}</td>
                <td>
                  <Badge
                    bg={getBadgeColor(book.category)}
                    pill
                    className="px-3 fw-medium"
                  >
                    {book.category}
                  </Badge>
                </td>
                <td className="text-center">{book.publication_year}</td>
                <td className="text-center">
                  {}
                  <span
                    className={`fw-bold ${book.stock <= 2 ? "text-danger" : "text-dark"}`}
                  >
                    {book.stock}
                    {book.stock <= 2 && (
                      <small className="ms-1 font-monospace">(Low)</small>
                    )}
                  </span>
                </td>
                <td className="text-end px-4">
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2 rounded-3"
                    onClick={() => handleShowEditModal(book)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-3"
                    onClick={() => handleShowConfirmDeleteModal(book)}
                  >
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {}
      <Modal
        show={showAddEditModal}
        onHide={handleCloseAddEditModal}
        centered
        backdrop="static"
      >
        <Form onSubmit={handleFormSubmit}>
          <Modal.Header closeButton className="border-0 px-4 pt-4">
            <Modal.Title className="fw-bold">
              {isEditing ? "✏️ Edit Buku" : "➕ Tambah Buku Baru"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4">
            {error && (
              <Alert variant="danger" className="rounded-3 small">
                {error}
              </Alert>
            )}
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Judul Buku</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentBook.title}
                onChange={handleFormChange}
                required
                placeholder="Contoh: Belajar React"
                className="rounded-3"
              />
            </Form.Group>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Penulis</Form.Label>
                  <Form.Control
                    type="text"
                    name="author"
                    value={currentBook.author}
                    onChange={handleFormChange}
                    required
                    className="rounded-3"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Penerbit</Form.Label>
                  <Form.Control
                    type="text"
                    name="publisher"
                    value={currentBook.publisher}
                    onChange={handleFormChange}
                    required
                    className="rounded-3"
                  />
                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold">Kategori</Form.Label>
              <Form.Select
                name="category"
                value={currentBook.category}
                onChange={handleFormChange}
                required
                className="rounded-3"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">
                    Tahun Terbit
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="publication_year"
                    value={currentBook.publication_year}
                    onChange={handleFormChange}
                    required
                    min="0"
                    className="rounded-3"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label className="small fw-bold">Stok</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={currentBook.stock}
                    onChange={handleFormChange}
                    required
                    min="0"
                    className="rounded-3"
                  />
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0 px-4 pb-4">
            <Button
              variant="light"
              onClick={handleCloseAddEditModal}
              className="px-3 rounded-pill text-muted"
            >
              Batal
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="px-4 rounded-pill shadow-sm"
            >
              {isLoading ? "Sedang Menyimpan..." : "Simpan Data"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal
        show={showConfirmModal}
        onHide={handleCloseConfirmDeleteModal}
        centered
        size="sm"
      >
        <Modal.Body className="text-center p-4">
          <div className="text-danger mb-3 h1">
            <i className="bi bi-exclamation-octagon"></i>
          </div>
          <h5 className="fw-bold">Yakin hapus?</h5>
          <p className="text-muted small">
            Buku <strong>{itemToDelete?.title}</strong> akan dihapus permanen.
          </p>
          <div className="d-flex gap-2">
            <Button
              variant="light"
              className="w-100 rounded-3 text-muted"
              onClick={handleCloseConfirmDeleteModal}
            >
              Batal
            </Button>
            <Button
              variant="danger"
              className="w-100 rounded-3"
              onClick={handleConfirmDelete}
            >
              Hapus
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <ToastContainer
        position="bottom-end"
        className="p-3"
        style={{ zIndex: 1056 }}
      >
        <Toast
          onClose={() => setNotification({ ...notification, show: false })}
          show={notification.show}
          delay={3000}
          autohide
          bg={notification.type}
          className="border-0 shadow-lg rounded-3"
        >
          <Toast.Body
            className={
              notification.type === "success" || notification.type === "danger"
                ? "text-white p-3"
                : "p-3"
            }
          >
            <div className="d-flex align-items-center">
              <span className="me-2">
                {notification.type === "success" ? "✅" : "❌"}
              </span>
              {notification.message}
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default BookPage;
