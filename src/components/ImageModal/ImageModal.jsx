
import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');
const ImageModal = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
      contentLabel="Image preview"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      closeTimeoutMS={0}
    >
      {image && (
        <div className={css.wrapper} onClick={(e) => e.stopPropagation()}>
          <img src={image.src} alt={image.alt} className={css.image} />
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;





