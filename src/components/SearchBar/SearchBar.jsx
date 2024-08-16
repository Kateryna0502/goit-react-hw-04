

//   const SearchBar = ({ onSubmit }) => {
  
// 	const handleSubmit = (evt) => {
//     evt.preventDefault();
//     const form = evt.target;
// 		const topic = form.elements.topic.value;
    
// 		// Якщо текстове поле порожнє, виводимо повідомлення
// 		// і припиняємо виконання функції.
// 		if(form.elements.topic.value.trim() === "") {
// 			toast.error("Enter a valid value!", {
//         duration: 4000,
//         position: "top-right",
//       });
// 				}

// 		// У протилежному випадку викликаємо пропс
// 		// і передаємо йому значення поля
// 		onSubmit(topic);
//     form.reset();
//   };

//   return (
//     <header className={css.wrapper}>
//       <form onSubmit={handleSubmit}>
//         <Toaster />
//         <div className={css.formWrapper}>
//           <button type="submit" className={css.searchBtn}>
//             <CiZoomIn />
//             {/* <IoIosSearch /> */}
//           </button>
//           <input
//             className={css.textInput}
//             type="text"
//             name="searchingValue"
//             placeholder="Search photos and images"
//           />
//         </div>
//       </form>
//     </header>
       
//   );
// };
import { useState } from 'react';
import css from './SearchBar.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSubmit }) => {
  const [notification, setNotification] = useState(false);

  const handleSubmit = evt => {
    evt.preventDefault();
    if (evt.currentTarget.elements.query.value.trim() === '') {
      setNotification(true);
    } else {
      setNotification(false);
      onSubmit(evt);
    }
  };

  const notify = () => {
    toast.dismiss();
    toast.error('Поле пошуку не може бути порожнім.');
  };
  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <button className={css.btn} type="submit" onClick={notify}>
          <FaSearch className={css.searchIcon} />
        </button>
        <input
          className={css.input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
      {notification && (
        <Toaster
          toastOptions={{
            position: 'top-right',
            style: {
              border: '1px solid #713200',
              padding: '16px',
              color: '#713200',
            },
          }}
        />
      )}
    </header>
  );
};
export default SearchBar;



