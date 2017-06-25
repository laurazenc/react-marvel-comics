import React from 'react';

const Character = ({ character }) => {
  const thumbnail = character.thumbnail.path + '.' + character.thumbnail.extension;
  const sectionStyle = {
    backgroundImage: `url(${thumbnail})`
  };


	return (
		<div className="character-content">
			<div className="character-thumbnail" style={sectionStyle}></div>
      <div className="character-name"> {character.name} </div>
		</div>
	);
};

export default Character;
