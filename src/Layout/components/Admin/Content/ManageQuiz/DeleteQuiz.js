import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";

import { deleteQuizForAdmin } from "~/services/ApiServices";

function DeleteQuiz({ show, setShow, dataDeleteQuiz, fetchListQuiz }) {
  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser = async () => {
    let data = await deleteQuizForAdmin(dataDeleteQuiz.id);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await fetchListQuiz();
    }

    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure delete this user : id{" "}
          {dataDeleteQuiz && dataDeleteQuiz.id}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmitDeleteUser()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteQuiz;
