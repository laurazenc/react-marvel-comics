import React from 'react';

const ModalComic = (props) => {


	const comic = props.comic.data;
  const thumbnail = comic.thumbnail.path + '.' + comic.thumbnail.extension;
	const isFavorited = comic.isFavorited;
  const sectionStyle = {
    backgroundImage: `url(${thumbnail})`
  };

  const creators = comic.creators.items.map((creator, key) => {
    return <li key={key}>{creator.name}</li>
  });

  const prices = comic.prices.map((price, key) => {
    return <li key={key}>{price.type} <strong>{price.price}</strong></li>
  });

	const favoritedStyle = (isFavorited)
	? { opacity: 0.3 }
	: { opacity: 1};


   return (
    <div className="modal-comic-container" onClick={props.closeModal}>
      <div className="modal-comic">
        <div className="comic-thumbnail" style={sectionStyle}></div>
        <div className="comic-content-container">
        <div className="comic-content">
          <div className="comic-title">{comic.title}</div>
					<div className="comic-description">{comic.description}</div>
          <div className="comic-creator">
            <h5>CREATORS:</h5>
            <ul>{creators}</ul>
          </div>
          <div className="comic-creator">
            <h5>PRICE:</h5>
            <ul>{prices}</ul>
          </div>
        </div>
          <button className="favoriteBtn" style={favoritedStyle} disabled={isFavorited} onClick={(e) => handleFavorite(e, props)}>FAVORITE</button>
        </div>
      </div>
    </div>
   );

	function handleFavorite(e, props) {
		props.handleFavorite(e, props);
		props.closeModal(e);
	}
};



export default ModalComic;
