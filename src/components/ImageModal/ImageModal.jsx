import Modal from 'react-modal';
import css from "./ImageModal.module.css";


const customStyles = {
  content: {
    width: '60%',
    height: '90%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};
const ImageModal = ({ modalIsOpen, closeModal, src, alt }) => {
  
  
    return (
    <Modal
      style={customStyles}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      // shouldCloseOnOverlayClick={true}
    >
      <img
        className={css.photo}
        // src={currentPhoto.url}
        //   alt={currentPhoto.alt}
          src={src} alt={alt}
      />
    </Modal>
  );
};

export default ImageModal;




// import { useEffect, useRef, useState } from "react";
// import css from "./Modal.module.css";
// import { createPortal } from "react-dom";
// import AddProfileForm from "../AddProfileForm/AddProfileForm";


// const Modal = ({ onCloseModal, serverData }) => {
//   const [counter, setCounter] = useState(() => {
//     return parseInt(localStorage.getItem("counterValue") ?? 0);
//   });
//   const buttonRef = useRef(null);
//   const secondButtonRef = useRef(null);

//   useEffect(() => {
//     localStorage.setItem("counterValue", counter);
//   }, [counter]);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.code === "Escape") {
//         onCloseModal();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [onCloseModal]);

//   const handleBackDropClick = (event) => {
//     if (event.target === event.currentTarget) {
//       onCloseModal();
//     }
//   };

//   const handleTestRef = () => {
//     secondButtonRef.current = "Hello Alibaba";
//   };

//   return createPortal(
//     <div onClick={handleBackDropClick} className={css.backdrop}>
//       <div className={css.modal}>
//         <button
//           type="button"
//           aria-label="Close modal button"
//           className={css.closeModalBtn}
//           onClick={onCloseModal}
//         >
//           &times;
//         </button>

//         <h3 className={css.title}>Modal</h3>
//         <p className={css.text}>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet in
//           doloremque laboriosam tempore reprehenderit maiores nobis eligendi ad
//           ipsum facere!
//         </p>
//         <button ref={buttonRef} onClick={handleTestRef} type="button">
//           Click to focus on the second button
//         </button>
//         <button
//           ref={secondButtonRef}
//           type="button"
//           onClick={() => setCounter(counter + 1)}
//         >
//           Click to increment counter: {counter}
//         </button>

//        <p>Server Data: {serverData}</p>
//       </div>
//     </div>,
//     document.getElementById("modal-root")
//   );
// };

// export default Modal;