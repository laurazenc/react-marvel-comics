import React from 'react';
import md5 from 'md5';
import axios from 'axios';


const PUBLIC_KEY= 'c56855e0d5c0edc9a144d1ea95b9314c';
const PRIVATE_KEY= 'b3cac96ce6184f19d6d4681145f79f096bd7227f';
const LIMIT= 25;


function makeApiCall(urlPart){
	urlPart = urlPart||"";
  let ts = Date.now();
  let hash = md5(ts + PRIVATE_KEY + PUBLIC_KEY);
  let REQUEST_URL = 'http://gateway.marvel.com:80/v1/public/comics?ts=' + ts + '&apikey=' + PUBLIC_KEY + '&hash=' + hash + '&limit=' + LIMIT + '&offset=';

	// var url = "http://gateway.marvel.com/v1/public/" + urlPart + (urlPart.indexOf("?") >= 0 ? "&" : "?") + "apikey="+"c56855e0d5c0edc9a144d1ea95b9314c";
	return axios.get(REQUEST_URL);
}

function getCharacters(urlPart){
	urlPart = urlPart||"";
	return makeApiCall();
}

let fetchData;

class ComicList extends React.component{

  loadHeroes(){
      getCharacters()
      .then(function(data){
        fetchedData = data.data.results;
        this.setState({data:data.data.results});
      }.bind(this));
  };

  loadHeroByName(name){
      getCharacters("?nameStartsWith=" + name).then(function(data){
          this.setState({data: data.data.results, currentTeam: this.state.currentTeam});
      }.bind(this));
  };

  addToTeam(item){
      this.state.currentTeam.push(item);
      this.setState({data:this.state.data, currentTeam: this.state.currentTeam});
  };

  getInitialState(){
    return {data: fetchedData || []};
  };

  componentDidMount(){
    if (!fetchedData) this.loadHeroes();
      //this.loadHeroByName("Ajaxis");
  };

  render(){

      var rows = [];
      console.log(this.state);
      this.state.data.forEach(function(heroe) {
        console.log(heroe);
      });



      return(
          <div className="heroBox row">
              <div className="col-md-8">
                <HeroList data={this.state.data} addToTeam={this.addToTeam} />
              </div>
              <div className="col-md-4 teamWrapper">

              </div>
          </div>
      )
  };
};

var HeroList = React.createClass({
	addToTeam: function(item){
		//basically a passthru
		this.props.addToTeam(item);
	},
	render: function(){
		var that = this;
		var nodes = this.props.data.map(function(hero, index){
			return <Hero key={index} name={hero.name} thumbnail={hero.thumbnail} description={hero.description} addToTeam={that.addToTeam}></Hero>;
		});

		return <div className="heroList">{nodes}</div>
	}
});

var Hero = React.createClass({
	getImage: function(){
		return this.props.thumbnail.path + "." + this.props.thumbnail.extension;
	},
	handleClick: function(){
		var image = this.getImage();
		this.props.addToTeam({name: this.props.name, image: image })
	},
	render: function(){
		return (
			<div className="hero col-md-3">
				<div className="heroWrapper">
					<h2 className="heroName">{this.props.name}</h2>
					<div className="imageWrapper">
						<img src={this.getImage()} className="heroThumbnail" />
					</div>
					<div className="description">
						<p>{this.props.description}</p>
					</div>
					<button type="button" className="addToTeam btn btn-primary" onClick={this.handleClick}>Add To Team</button>
				</div>
			</div>
		);
	}
});

export default ComicList;
