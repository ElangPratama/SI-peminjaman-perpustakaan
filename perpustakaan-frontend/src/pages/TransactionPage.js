import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Badge,
  Modal,
  Form,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "../App.css";

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    book_id: "",
    member_id: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const fetchData = async () => {
    try {
      const [transRes, booksRes, membersRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/transactions"),
        axios.get("http://127.0.0.1:8000/api/books"),
        axios.get("http://127.0.0.1:8000/api/members"),
      ]);
      setTransactions(transRes.data.data.data);
      setBooks(booksRes.data.data.data.filter((book) => book.stock > 0));
      setMembers(membersRes.data.data.data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/transactions",
        newTransaction,
      );
      setShowAddModal(false);
      fetchData();
      setNotification({
        show: true,
        message: "Peminjaman Berhasil!",
        type: "success",
      });
    } catch (error) {
      setNotification({
        show: true,
        message: "Gagal Memproses. Cek Stok Buku.",
        type: "danger",
      });
    }
  };

  return (
    <Container className="main-container">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h2 className="fw-bold text-indigo-700">📑 Riwayat Transaksi</h2>
        <Button variant="success" onClick={() => setShowAddModal(true)}>
          + Pinjam Buku Baru
        </Button>
      </div>

      <Table hover responsive className="align-middle border-0">
        <thead>
          <tr>
            <th>#</th>
            <th>Nama Peminjam</th>
            <th>Judul Buku</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={transaction.id}>
              <td>{index + 1}</td>
              <td className="fw-bold">{transaction.member?.name || "N/A"}</td>
              <td>{transaction.book?.title || "N/A"}</td>
              <td>
                <Badge
                  bg={transaction.status === "dipinjam" ? "warning" : "success"}
                  className="px-3 py-2"
                >
                  {transaction.status === "dipinjam"
                    ? "⏳ Dipinjam"
                    : "✅ Kembali"}
                </Badge>
              </td>
              <td>
                {transaction.status === "dipinjam" && (
                  <Button
                    variant="outline-success"
                    size="sm"
                    onClick={async () => {
                      if (window.confirm("Proses pengembalian?")) {
                        await axios.put(
                          `http://127.0.0.1:8000/api/transactions/${transaction.id}`,
                        );
                        fetchData();
                      }
                    }}
                  >
                    Terima Kembali
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Form onSubmit={handleFormSubmit}>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">🆕 Tambah Peminjaman</Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4">
            <Form.Group className="mb-3">
              <Form.Label>Pilih Buku (Stok &gt; 0)</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    book_id: e.target.value,
                  })
                }
                required
              >
                <option value="">-- Pilih Buku --</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title} (Stok: {book.stock})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pilih Anggota</Form.Label>
              <Form.Select
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    member_id: e.target.value,
                  })
                }
                required
              >
                <option value="">-- Pilih Anggota --</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 px-4 pb-4">
            <Button variant="primary" type="submit" className="w-100 py-2">
              Proses Transaksi
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          show={notification.show}
          autohide
          delay={3000}
          bg={notification.type}
          onClose={() => setNotification({ ...notification, show: false })}
        >
          <Toast.Body className="text-white">{notification.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default TransactionPage;
