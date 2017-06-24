import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getCharacters } from '../actions';

import {Link} from 'react-router';

// import ComicList from './../components/ComicList';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);

    // this.searchInput = this.refs.searchInput.value;
  }

  shouldComponentUpdate(props, nextProps) {
    return props !== nextProps;
  }

  componentWillMount() {
    this.props.getCharacters();
    // getCharacters()
    // .then((data) => {
    //   this.setState({data: data.data.results});
    // });
  }

  handleSubmit() {
       var query = this.refs.searchInput.value;

       getCharacters(query)
       .then((data) => {
         this.setState({data: data.data.results});
       });
  }

  render() {
    const {characters} = this.props.characters;
    console.log(characters);

    // if(characters) {
    //   var node = this.state.data.map((hero) => {
    //     var thumbnail = hero.thumbnail.path + '.' + hero.thumbnail.extension;
    //     var sectionStyle = {
    //       backgroundImage: `url(${thumbnail})`
    //     };
    //     return (
    //       <Link to={`/details/${hero.id}`} key={hero.id} className="hero">
    //         <div className="hero-thumbnail" style={sectionStyle}></div>
    //         <div className="hero-name"> {hero.name} </div>
    //
    //       </Link>
    //     );
    //   });
    //   return (
    //     <div>
    //       <div className="search-bar">
    //         <input id="search" ref="searchInput" type="text" name="search" placeholder="Search Characters..." onChange={this.handleSubmit} />
    //       </div>
    //       <div className="heroes-box">{node}</div>
    //     </div>
    //    );
    // } else
    return ( <div>Nothing to show</div> )
    // }
  }

};

function mapStateToProps(state) {
  return {
    characters: state.characters
  }
}


export default connect(mapStateToProps, {getCharacters})(HomePage);
