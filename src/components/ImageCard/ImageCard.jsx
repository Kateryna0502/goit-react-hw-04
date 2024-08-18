import css from "./ImageCard.module.css";

const ImageCard = ({ title, urls, likes, openModal, setCurrentPhoto }) => {
  const handleClick = () => {
    setCurrentPhoto({ url: urls.regular, alt: title });
    console.log(urls.regular, title)
    openModal();
  };

  return (
    <div onClick={handleClick} className={css.wrapper}>
      <img className={css.imageCard} src={urls.small} alt={title} />
      <div className={css.descriptionWrapper}>
        <p>Likes: {likes}</p>
      </div>
    </div>
  );
};

export default ImageCard;