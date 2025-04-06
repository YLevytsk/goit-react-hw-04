import { useState, useEffect, useRef } from 'react';
import { FaRegSurprise } from 'react-icons/fa';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ImageModal from './ImageModal/ImageModal';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import css from './App.module.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ACCESS_KEY = 'z6FhDqZggXhkEbxX3KSgSdJpnoOzufaypqFAPpqo44I'; // В следующий раз .env, бро

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

  const lastImageRef = useRef(null);

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === '') return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setTotalPhotos(0);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleLoadMore = () => {
    if (page * 12 < totalPhotos) {
      setPage(prev => prev + 1);
    }
  };

  const scrollToLastImage = () => {
    if (lastImageRef.current) {
      lastImageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=12&page=${page}&client_id=${ACCESS_KEY}`
        );
        const data = await response.json();

        if (data.results.length === 0) {
          setError('Нічого не знайдено. Спробуйте інший запит!');
          return;
        }

        setTotalPhotos(data.total);
        setImages(prev => page === 1 ? data.results : [...prev, ...data.results]);

        // Прокрутка только если это НЕ первая страница
        if (page > 1) {
          setTimeout(scrollToLastImage, 300);
        }
      } catch (error) {
        console.error('Ошибка загрузки:', error);
        setError('Сталася помилка. Спробуйте ще раз!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const isMaxPagesReached = page * 12 >= totalPhotos;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery
            images={images}
            onImageClick={handleImageClick}
            lastImageRef={lastImageRef}
          />

          {!isMaxPagesReached && images.length > 0 && !isLoading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}

          {images.length > 0 && isMaxPagesReached && (
            <p className={css.end}>
              Усі зображення завантажено
              <FaRegSurprise style={{ fontSize: '30px', color: 'blue', verticalAlign: 'middle', marginLeft: '10px' }} />
            </p>
          )}
        </>
      )}

      {isLoading && <Loader />}

      <ImageModal
        isOpen={Boolean(selectedImage)}
        onRequestClose={closeModal}
        image={selectedImage}
      />

      <ToastContainer />
    </div>
  );
}

export default App;


















