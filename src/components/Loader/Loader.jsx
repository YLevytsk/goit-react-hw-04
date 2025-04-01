import { BeatLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <BeatLoader color="#ff1493" size={15} margin={5} />
    </div>
  );
};

export default Loader;

