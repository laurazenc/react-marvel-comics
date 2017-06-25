import React, { Component } from 'react';
import { connect } from 'react-redux';

// action creators
import { getFavorites, getComic} from '../actions';

// components
import { Loading, Comic } from '../components';

class Favorites extends Component {
	constructor(props) {
		super(props);

		this.state = {
			comics: {}
		};

		this._openModal = this._openModal.bind(this);
	}

	componentWillMount() {
    this.props.getFavorites()
		.then(() => {
			let comics = [];
			this.props.favorites.map((id) => {
				this.props.getComic(id)
				.then((comic) => {
					comics.push(comic);
					this.setState({comics: comics});
				})
			});
		});
	}

	shouldComponentUpdate(props, nextProps) {
		return props !== nextProps;
	}

	_openModal() {	}

	render() {
		const comics = (this.state.comics && this.state.comics.length)
		? this._renderComics()
		: 'Oops! No comics found.';

		return (<div className="favorites-container"> {comics} </div> );
	}

	_renderComics() {
		const comics = this.state.comics;
		if(comics && comics.length > 0) {
			return comics.map((comic, key) => {
				return <Comic comic={comic} key={key} openModal={this._openModal}/>;
			});
		} else {
			return(<Loading/> );
		}
	}

}

function mapStateToProps(state) {
	return {
		favorites: state.character.favorites
	};
}

export default connect(mapStateToProps, { getFavorites, getComic })(Favorites);
