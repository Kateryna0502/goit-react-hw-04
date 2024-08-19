import { useState, useEffect, useMemo } from "react";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import Loader from "./components/Loader/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import requestPhotos from "./services/api.jsx";
// import toast, { Toaster } from "react-hot-toast";


const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [photos, setPhotos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [showBtn, setShowBtn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPhoto, setCurrentPhoto] = useState({
    url: '',
    alt: '',
  });

  useEffect(() => {
    async function fetchPhotos(query) {
      try {
        setError(false);
        setIsLoading(true);
        
        if (inputValue === null) return;
        const data = await requestPhotos(query, currentPage);
        if (totalPages < currentPage) return;
        if (data.results.length === 0) {
          setError(true);
        } else {
          setPhotos(prev =>
            currentPage === 1 ? data.results : [...prev, ...data.results]
          );
          setTotalPages(data.total_pages);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPhotos(inputValue);
  }, [inputValue, currentPage, totalPages]);

  const onSubmit = evt => {
    const form = evt.currentTarget;
    setPhotos(null);
    setCurrentPage(1);
    setShowBtn(false);
    setInputValue(form.elements.query.value);
    form.reset();
  };

  
  const handleLoadMore = () => {
		setCurrentPage(currentPage + 1);
	};

  const isActive = useMemo(() => currentPage === totalPages, [currentPage, totalPages]);
  
  
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [modalIsOpen]);

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {photos !== null &&  (
        <ImageGallery
          photos={photos}
          setCurrentPhoto={setCurrentPhoto}
          openModal={openModal}
        />
      )}
        {totalPages < currentPage && (
        <p
          style={{
            color: 'red',
            margin: 'auto',
            width: '500px',
            display: 'flex',
            justifyContent: 'center',
          }} >
          За вашим запитом не знайдено більше фотографій </p>
      )}
      {Array.isArray(photos) && photos.length === 0 && (
        <p style={{ color: 'red', margin: 'auto', width: '500px' }}>
          За вашим запитом не знайдено фотографій, спробуйте ще раз
        </p>
      )}
      {isLoading && <Loader />}
      {Array.isArray(photos) && photos.length > 0 && !error && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} isActive={isActive} />
      )}
      
			{error && (
        <ErrorMessage>
          Whoops, something went wrong! Please try reloading this page!
        </ErrorMessage>
      )}
      {modalIsOpen && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          currentPhoto={currentPhoto}
        />
      )}
    </div>
  );
};

export default App;





// const App = () => {
//   const [images, setImages] = useState(null);
//   const [Loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [currentImage, setCurrentImage] = useState({
//     url: "",
//     alt: "",
//   });

//   function openModal() {
//     setModalIsOpen(true);
//   }

//   function closeModal() {
//     setModalIsOpen(false);
//   }
//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.code === "Escape") {
//         closeModal();
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [closeModal]);

//   useEffect(() => {
//     if (searchValue.trim() === "") return;
//     const getPhotos = async (value) => {
//       setError(false);
//       setLoading(true);
//       try {
//         const data = await requestPhotos(value, pageNumber);
//         setImages((items) => {
//           if (items !== null) {
//             return [...items, ...data.results];
//           }
//           return data.results;
//         });

//         setTotalPages(data.total.pages);
//         if (data.total.pages === 0) {
//           toast.error("Nothing was found for your request", {
//             duration: 4000,
//             position: "top-right",
//           });
//           return;
//         }
//       } catch(error) {
//         setError(true);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getPhotos(searchValue);
//   }, [searchValue, pageNumber]);

//   const handleSubmit = (userValue) => {
//     setImages(null);
//     setPageNumber(1);
//     setSearchValue(userValue);
//   };

//   return (
//     <div>
//       <SearchBar onSubmit={handleSubmit} />
//       {images !== null && (
//         <ImageGallery
//           images={images}
//           openModal={openModal}
//           setCurrentImage={setCurrentImage}
//         />
//       )}
//       <ImageModal
//         modalIsOpen={modalIsOpen}
//         closeModal={closeModal}
//         currentImage={currentImage}
//       />
//       {Loading && <Loader />}
//       {error && <ErrorMessage />}
//       {totalPages > pageNumber && (
//         <LoadMoreBtn
//           handleClick={() => {
//             setPageNumber(pageNumber + 1);
//           }}
//         />
//       )}
//     </div>
//   );
// };




// Access Key: lD1P932jYFcxUcvysE1bhjA5NVgfVCLU2ML6haokAUE
