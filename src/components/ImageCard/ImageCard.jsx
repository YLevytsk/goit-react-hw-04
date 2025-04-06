import css from './ImageCard.module.css';

const ImageCard = ({ url, alt, onImageClick }) => {
  return (
    <div className={css.card}>
      <img 
        src={url}
        alt={alt}
        className={css.image}
        loading="lazy"  
        onClick={onImageClick} 
      />
    </div>
  );
};

export default ImageCard;

