import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaHeart, FaDownload, FaEye } from 'react-icons/fa';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

const ImageModal = ({ isOpen, onRequestClose, image }) => {
  const [localIsOpen, setLocalIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && !localIsOpen) {
      setLocalIsOpen(true);  
    } else if (!isOpen && localIsOpen) {
      setLocalIsOpen(false);  
    }
  }, [isOpen]);

  const closeModal = () => {
    setLocalIsOpen(false);
    onRequestClose();
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    closeModal();
  };

  if (!image) return null;  

  const { likes, downloads, views, alt_description, src } = image;

  return (
    <Modal
      isOpen={localIsOpen}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={css.overlayClassName}
      contentLabel="Image preview"
      shouldCloseOnEsc={true}
      closeTimeoutMS={200}
      preventScroll={true}
    >
      <div className={css['image-container']} onClick={handleImageClick}>
        <img
          src={src}
          alt={alt_description || 'Image'}
          className={css.image}
        />
        <div className={css['image-info']}>
          <div className={css.item}>
            <FaHeart className={`${css.icon} ${css['icon-heart']}`} />
            <span className={`${css.count} ${css['count-heart']}`}>{likes || 0}</span>
          </div>
          <div className={css.item}>
            <FaDownload className={`${css.icon} ${css['icon-download']}`} />
            <span className={`${css.count} ${css['count-download']}`}>{downloads || 0}</span>
          </div>
          <div className={css.item}>
            <FaEye className={`${css.icon} ${css['icon-eye']}`} />
            <span className={`${css.count} ${css['count-eye']}`}>{views || 0}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageModal;


























