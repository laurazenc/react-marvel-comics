import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Link } from 'react-router';

// action creators
import { getCharacters, getSingleCharacter } from '../actions';

// components
import {Character, Loading, Pagination} from '../components';


export class Home extends Component{
	constructor(props) {
		super(props);

		this.state = {
			character: {},
			offset: 0
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.setPage     = this.setPage.bind(this);

	}

	componentWillMount() {
		this.props.actions.getCharacters(this.state.offset);
	}

	shouldComponentUpdate(props, nextProps) {
		return props !== nextProps;
	}

	handleSubmit() {
		let query = this.refs.searchInput.value;
		this.props.actions.getCharacters(this.state.offset, query);
	}

	setPage(page) {
		let offset = (page <= 1) ? 0 : (page - 1)*20;
		this.setState({offset: offset});
		this.props.actions.getCharacters(this.state.offset);
	}


	_renderSingleCharacter() {
		const characters = this.props.characters;
		if (characters.error) {
			return (
				<div>
					<h1>{characters.error}</h1>
				</div>
			);
		}

		return Object.keys(characters).map((id, key) => {
			return (
				<Link to={`/details/${characters[id].id}`} key={key} className="character-box">
					<Character character={characters[id]}/>
				</Link>
			);
		});
	}

	render() {
		const characters = this.props.characters;

		if(characters) {
			let data = (!characters.length)
			? (<Loading/>)
			: (this._renderSingleCharacter());


			let pagination = (Object.keys(characters).length)
			? <Pagination setPage={this.setPage} currentPage={this.state.currentPage}/>
			: '';


			return (
				<div>
					<div className="search-bar">
						<input id="search" ref="searchInput" type="text" name="search" placeholder="Search Characters..." onChange={this.handleSubmit} />
					</div>
					<div className="characters-container">
						{data}
					</div>
					<div className="pagination-container">
						{pagination}
					</div>
				</div>
			);
		} else {
			return (<Loading/>);
		}
	}

}

Home.propTypes = {
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
		characters: state.character.characters
});


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getCharacters, getSingleCharacter }, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
