import React from 'react';
import PropTypes from 'prop-types';

class OpenModal extends React.Component {

	render() {

		if(!this.props.show) {
			return null;
		}
		
		return(
			<div className="trailer-modal">
				<header>
					<div className="trailer-modal__header">
						<p>{this.props.video.name}</p>
						<button onClick={this.toggleModal.bind(this)}>
							<span>close</span>
						</button>
					</div>
				</header>
				<div className="trailer-modal__content">
					<iframe src={"http://www.youtube.com/embed/" + this.props.video.key} allowFullScreen></iframe>
				</div>
			</div>
		);
	}

	toggleModal(event) {
		this.props.toggleModal(event);
	}

}

export default OpenModal;