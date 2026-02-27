import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Badge,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "../App.css";

function MemberPage() {
  const [members, setMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMember, setCurrentMember] = useState({
    id: null,
    name: "",
    address: "",
    phone_number: "",
  });
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/members");
      setMembers(response.data.data.data);
    } catch (error) {
      console.error("Gagal ambil data:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing
      ? `http://127.0.0.1:8000/api/members/${currentMember.id}`
      : "http://127.0.0.1:8000/api/members";
    const method = isEditing ? "put" : "post";
    try {
      await axios[method](url, currentMember);
      setShowModal(false);
      fetchMembers();
      setNotification({
        show: true,
        message: "Data Anggota Berhasil Disimpan!",
        type: "success",
      });
    } catch (error) {
      setNotification({
        show: true,
        message: "Gagal Menyimpan Data.",
        type: "danger",
      });
    }
  };

  return (
    <Container className="main-container">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
        <h2 className="fw-bold text-indigo-700">👥 Manajemen Anggota</h2>
        <Button
          variant="primary"
          onClick={() => {
            setIsEditing(false);
            setCurrentMember({
              id: null,
              name: "",
              address: "",
              phone_number: "",
            });
            setShowModal(true);
          }}
        >
          + Tambah Anggota
        </Button>
      </div>

      <Table hover responsive className="text-center align-middle border-0">
        <thead>
          <tr>
            <th>Nama Lengkap</th>
            <th>Alamat</th>
            <th>No. Telepon</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="fw-semibold">{member.name}</td>
              <td className="text-muted">{member.address}</td>
              <td>
                <Badge bg="light" text="dark" className="border px-3">
                  {member.phone_number}
                </Badge>
              </td>
              <td>
                <Button
                  variant="link"
                  className="text-warning p-0 me-3"
                  onClick={() => {
                    setIsEditing(true);
                    setCurrentMember(member);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="link"
                  className="text-danger p-0"
                  onClick={async () => {
                    if (window.confirm("Hapus anggota?")) {
                      await axios.delete(
                        `http://127.0.0.1:8000/api/members/${member.id}`,
                      );
                      fetchMembers();
                    }
                  }}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Tambah/Edit Member */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        rounded-4
      >
        <Form onSubmit={handleFormSubmit}>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold">
              {isEditing ? "✏️ Edit Anggota" : "➕ Anggota Baru"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="px-4">
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={currentMember.name}
                onChange={(e) =>
                  setCurrentMember({ ...currentMember, name: e.target.value })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={currentMember.address}
                onChange={(e) =>
                  setCurrentMember({
                    ...currentMember,
                    address: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telepon</Form.Label>
              <Form.Control
                type="text"
                value={currentMember.phone_number}
                onChange={(e) =>
                  setCurrentMember({
                    ...currentMember,
                    phone_number: e.target.value.replace(/\D/g, ""),
                  })
                }
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer className="border-0 px-4 pb-4">
            <Button variant="light" onClick={() => setShowModal(false)}>
              Batal
            </Button>
            <Button variant="primary" type="submit" className="px-4">
              Simpan Anggota
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          onClose={() => setNotification({ ...notification, show: false })}
          show={notification.show}
          delay={3000}
          autohide
          bg={notification.type}
        >
          <Toast.Body className="text-white">{notification.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default MemberPage;
