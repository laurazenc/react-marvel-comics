import React, { Component } from 'react';
import { getCharacterInfo, getCharacterComics } from '../utils';

import {Link} from 'react-router';

// import ComicList from './../components/ComicList';

export default class HeroDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroId: this.props.params.id,
      data: [],
      comics: []
    }
  }

  componentWillMount() {
    getCharacterInfo(this.state.heroId)
    .then((data) => {
      this.setState({data: data.data.results[0]});
    });
  }

  getComics() {
    getCharacterComics(this.state.heroId)
    .then(data => {
      console.log(data);
    });
  }

  render() {
    const hero = this.state.data;
    console.log(hero);
    if(hero) {
      var thumbnail = (hero.thumbnail)
                      ? hero.thumbnail.path + '.' + hero.thumbnail.extension
                      : '';
      var sectionStyle = {
        backgroundImage: `url(${thumbnail})`
      };
      const comics = (hero.comics && hero.comics.items)
      ? hero.comics.items.map((comic, index) => {
        return (
          <div key={index}>
          {comic.name}
          </div>
        );
      })
      : `No Comics of ${hero.name}`;
      const links = (hero.comics && hero.comics.items)
                    ? hero.urls.map((url) => {

                      return (
                        <a href={url.url}>{url.type}</a>
                      )
                    })
                    : '';
      return (
        <div className="hero-detail">
          <div className="hero-header">
            <div className="hero-top-header">
              <div className="hero-thumbnail-content">
                <div className="hero-thumbnail" style={sectionStyle}></div>
              </div>
              <div className="hero-content">
                <div className="hero-name">{hero.name}</div>
                <div className="hero-description">{hero.description}</div>
                <div>
                  {links}
                </div>
              </div>
            </div>
          </div>

          <h3>Comics</h3>
          {comics}
        </div>
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}
