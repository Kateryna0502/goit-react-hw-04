
import css from "./ImageModal.module.css";
import Modal from "react-modal";
Modal.setAppElement("#root");

const ImageModal = ({ modalIsOpen, closeModal, currentPhoto }) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: "rgba(112, 211, 221, 0.3)",
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        }, 
      }}
      closeTimeoutMS={200}
    >
      <img className={css.photo} src={currentPhoto.url} alt={currentPhoto.title} />
    </Modal>
  );
};

export default ImageModal;



