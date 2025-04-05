import { useState, useEffect } from 'react';
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

const ACCESS_KEY = 'z6FhDqZggXhkEbxX3KSgSdJpnoOzufaypqFAPpqo44I';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0); 
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);  // Модалка будет открываться при клике
  const [imageData, setImageData] = useState(null);  // Состояние для данных о выбранном изображении
  const [error, setError] = useState(null);  // Теперь ошибка определена!

  const handleSearch = (newQuery) => {
    if (newQuery.trim() === '') return;

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setTotalPhotos(0); 
  };

  const handleImageClick = async (image) => {
    if (selectedImage !== image) {
      setSelectedImage(image);
      // Получаем подробности изображения через API
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${image.id}?client_id=${ACCESS_KEY}`
        );

        const data = await response.json();
        
        if (data && data[0]) {
          setImageData(data[0]);  // Заполняем состояние с данными изображения
        } else {
          setImageData(null);  // В случае отсутствия данных
        }
      } catch (error) {
        console.error('Error fetching image details:', error);
        setImageData(null);
      }
    }
  };

  const closeModal = () => {
    setSelectedImage(null); 
    setImageData(null);  // Очистить данные изображения при закрытии
  };

  const handleLoadMore = () => {
    if (page < 5 && images.length < totalPhotos) {
      setPage(prev => prev + 1);
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
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Сталася помилка. Спробуйте ще раз!');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const isMaxPagesReached = page >= 5 || images.length >= totalPhotos;

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {!isMaxPagesReached && images.length > 0 && !isLoading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
          {images.length > 0 && isMaxPagesReached && (
            <p className={css.end}>
              Усі зображення завантажено
              <FaRegSurprise style={{fontSize: '30px', color: 'blue', verticalAlign: 'middle', marginLeft: '10px' }} />
            </p>
          )}
        </>
      )}

      {isLoading && <Loader />}

      {/* Открытие модалки с данными о фотографии */}
      <ImageModal
        isOpen={Boolean(selectedImage)}  // Открываем модалку, если изображение выбрано
        onRequestClose={closeModal}
        image={imageData}  // Передаем актуальные данные
      />

      <ToastContainer />
    </div>
  );
}

export default App;














