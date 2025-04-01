
import css from './ImageCard.module.css';

const ImageCard = ({ url, alt }) => {
  return (
    <div className={css.card}>
      <img src={url} alt={alt} className={css.image} />
    </div>
  );
};

export default ImageCard;
