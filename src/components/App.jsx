import SearchBar from './SearchBar/SearchBar';
import { Toaster } from 'react-hot-toast';

function App() {
  const handleSearch = (query) => {
    console.log('Search for:', query);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
    </>
  );
}

export default App;
