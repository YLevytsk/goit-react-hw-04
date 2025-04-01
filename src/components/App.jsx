import { useState, useEffect } from 'react';
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);

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
    setPage(prev => prev + 1);
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=12&page=${page}&client_id=${ACCESS_KEY}`
        );

        const data = await response.json();
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

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

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />

      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />

          {images.length > 0 && !isLoading && images.length < totalPhotos && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}

          {images.length > 0 && images.length >= totalPhotos && (
            <p className={css.end}>Усі зображення завантажено 🎉</p>
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




