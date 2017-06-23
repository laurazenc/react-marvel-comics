import React from 'react';
import { getCharacters } from '../utils';

// import ComicList from './../components/ComicList';

const HomePage = React.createClass({

  componentWillMount() {
    getCharacters()
    .then((data) => {
      // heroes = data.data.results;
      console.log(data.data.results);
      this.setState({data: data.data.results});
    });
  },

  getInitialState() {
   return {data: []};
  },

  render() {
    if(this.state.data) {
      var node = this.state.data.map((hero) => {
        console.log(hero.thumbnail.path);
        var thumbnail = hero.thumbnail.path + '.' + hero.thumbnail.extension;
        var sectionStyle = {
          backgroundImage: `url(${thumbnail})`
        };
        return (
          <div key={hero.id} className="hero">
            <h2> {hero.name} </h2>
            <div className="hero-thumbnail" style={sectionStyle}></div>
            {}
          </div>
        );
      });
      return ( <div className="heroes-box">{node}</div> );
    } else return ( <div>Nothing to show</div> )
    // }
  }
});


export default HomePage;
