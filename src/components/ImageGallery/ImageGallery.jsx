import { useState, useEffect } from 'react';
import ImageModal from '../ImageModal/ImageModal'; // Импортируем компонент на уровень выше
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!images || images.length === 0) return null;

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <ul className={css.gallery}>
        {images.map(({ id, urls, alt_description }) => (
          <li key={id} className={css.item}>
            <div className={css.thumb}>
              <img
                src={urls.small}
                alt={alt_description}
                loading="lazy"
                className={css.image}
                onClick={() =>
                  handleImageClick({
                    src: urls.regular,
                    alt: alt_description,
                  })
                }
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Модалка, если изображение выбрано */}
      {selectedImage && (
        <ImageModal
          isOpen={Boolean(selectedImage)}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};

export default ImageGallery;

