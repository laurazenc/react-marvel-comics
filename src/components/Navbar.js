import React, {Component} from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';

import { getFavorites } from '../actions';


class Navbar extends Component{
	constructor(props){
		super(props);

		this.state = {
			favoritesCounter: 0
		}
	}

	componentWillMount() {
		this.props.getFavorites();
	}

	render() {
		const favorites = this.props.favorites;

		return (
      <div className="navbar">
        <Link to="/" className="logo"> </Link>
        <Link to="/favorites" className="favorites"> MY COMICS <div className="counter">{favorites.length}</div></Link>
      </div>
    );
	}
}

function mapStateToProps(state) {
	return {
		favorites: state.character.favorites,
	};
}

export default connect(mapStateToProps, { getFavorites })(Navbar);
