import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ImageModal from './ImageModal/ImageModal';
import css from './App.module.css';

const ACCESS_KEY = 'z6FhDqZggXhkEbxX3KSgSdJpnoOzufaypqFAPpqo44I';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=12&client_id=${ACCESS_KEY}`
        );
        const data = await response.json();
        setImages(data.results);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query]);

  return (
    <div className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {isLoading && <Loader />}
      <ImageModal
        isOpen={Boolean(selectedImage)}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
}

export default App;

