import React, { Component } from 'react';
import { connect } from 'react-redux';

// action creator
import { getSingleCharacter, getComics, saveComic, getFavorites } from '../actions';

// components
import {Loading, Comic, ModalComic} from '../components';

class CharacterDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
      id: '',
			comic: {},
			loading: true,
			isOpen: false,
			favorites: {}
		};

		this._openModal = this._openModal.bind(this);
		this._closeModal = this._closeModal.bind(this);
		this._handleFavorite = this._handleFavorite.bind(this);

	}


	componentWillMount() {
		const  {id}   = this.props.params;
		this.props.getSingleCharacter(id)
    .then(() => {
      this.setState({loading: false});
    });
		this.props.getFavorites();

		this.props.getComics(id);

	}

	shouldComponentUpdate(props, nextProps) {
		return props !== nextProps;
	}

	render() {
    const character = this.props.character;

    if(this.state.loading) {
      return (
        <Loading />
      );
    } else if(character) {

        const thumbnail = (character.thumbnail)
        ? character.thumbnail.path + '.' + character.thumbnail.extension
        : '';
        const sectionStyle = {
          backgroundImage: `url(${thumbnail})`
        };

				const comics = (character.comics.available > 0)
				? this._renderComics()
				: <div>Oops! No comics found.</div>;      

      return (
        <div className="character-detail">
          <div className="character-header">
            <div className="character-top-header">
							<div className="character-name">{character.name}</div>
              <div className="character-thumbnail-content">
                <div className="character-thumbnail" style={sectionStyle}></div>
              </div>
            </div>
          </div>

					<div className="comics-container">
						{comics}
						{this.state.isOpen ? <ModalComic comic={this.state.comic} closeModal={this._closeModal} handleFavorite={this._handleFavorite} isFavorited={this.state.isFavorited}/> : '' }
					</div>
        </div>
      );
    }
	}

	_openModal(id, data) {
		data.isFavorited = (this.props.favorites.indexOf(data.id) > -1)
		this.setState({comic: {data: data}, isOpen: true});
	}

	_closeModal(e) {
		if (e.target.classList[0] === 'modal-comic-container' || e.target.classList[0] === 'close-button' || e.target.classList[0] === 'favoriteBtn') {
			this.setState({ isOpen: false, comic: {} });
		}
	}

	_handleFavorite(e, data) {
		this.props.saveComic(data.comic.data);
	}

	_renderComics() {
		const { comics } = this.props;

		if(comics.length > 0) {
			return Object.keys(comics).map((id, key) => {
				return <Comic comic={comics[id]} key={key} id={id} openModal={this._openModal}/>;
			});
		} else {
			return(
				<div>...</div>
			);
		}
	}

	componentWillUnmount() {
		this.setState({
			thumbnail: ''
		});
	}
}

function mapStateToProps(state) {
	return {
		character: state.character.character,
		comics: state.character.comics,
		favorites: state.character.favorites,
	};
}

export default connect(mapStateToProps, { getSingleCharacter, getComics, getFavorites, saveComic })(CharacterDetail);
