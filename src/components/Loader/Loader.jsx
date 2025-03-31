import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <ClipLoader color="#1e90ff" size={48} />
    </div>
  );
};

export default Loader;
