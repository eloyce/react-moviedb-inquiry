import React from 'react';

class MovieDetailCast extends React.Component {

	constructor() {
		super();
		this.renderCastMembers = this.renderCastMembers.bind(this);
	}

	renderCastMembers(key) {
		const profileBasePath = "https://image.tmdb.org/t/p/w92";
		return(
			<li key={key} className="carousel-cast__item">
				<img src={profileBasePath + this.props.profile[key].profile_path} alt={'Image of ' + this.props.profile[key].name} />
				<div className="carousel-cast__info--names">
					<p>{ this.props.profile[key].name }</p>
					<span>{ this.props.profile[key].character }</span>
				</div>
			</li>
		)
	}

	render() {
		const castCount = this.props.profile.length > 100 ? alert('high count') : '';
		return(
			<div className="container">
				<ol className="carousel-cast__container">
					{ Object.keys(this.props.profile.slice(0, 8)).map(this.renderCastMembers) }
				</ol>
				{ castCount }
			</div>
		)
	}
}

export default MovieDetailCast;