import ImageCard from '../ImageCard/ImageCard'; 
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick, lastImageRef }) => {
  if (!images || images.length === 0) return null;

  return (
    <ul className={css.gallery}>
      {images.map(({ id, urls, alt_description }, index) => (
        <li
          key={id}
          className={css.item}
          ref={index === images.length - 1 ? lastImageRef : null}
        >
          <ImageCard
            url={urls.small}
            alt={alt_description}
            onImageClick={() =>
              onImageClick({
                src: urls.regular,
                alt: alt_description,
              })
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;







