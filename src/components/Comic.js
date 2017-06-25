import React from 'react';
import moment from 'moment';


const Comic = ({ comic, id, openModal }) => {
  const thumbnail = comic.thumbnail.path + '.' + comic.thumbnail.extension;
  const sectionStyle = {
    backgroundImage: `url(${thumbnail})`
  };
  const creators = comic.creators.items.map((creator, key) => {
    return <li key={key}>{creator.name}</li>
  });

	return (
    <div className="comic-wrap" onClick={() => openModal(id, comic)}>
      <div className="comic-box">
        <div className="comic-thumbnail-content">
          <div className="comic-thumbnail" style={sectionStyle}></div>
        </div>
        <div className="comic-content">
          <div className="comic-name"> {comic.title} </div>
          <div className="comic-date">
            {moment(comic.dates[0].date).format("YYYY-MM-DD")}
          </div>
          <div className="comic-creator">
            <h5>CREATORS:</h5>
            <ul>{creators}</ul>
          </div>
        </div>
      </div>
		</div>
	);
};

export default Comic;
