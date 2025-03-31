import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  if (!images || images.length === 0) return null;

  return (
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
                onImageClick({
                  src: urls.regular,
                  alt: alt_description,
                })
              }
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;

