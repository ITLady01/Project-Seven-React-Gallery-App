import React from 'react';

// simple component that returns a list item with an image element inside of it
const PhotosList = (props) => {
	return (
	  <li>
	    <img src={props.url} alt="" />
	  </li>
	);

	// let images = props.data.map((images) => (
	// 	<PhotosList
	// 		url={`https://farm${images.farm}.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`}
	// 		key={images.id}
	// 	/>
	// ));
	// return (
	// 	<div className="photo-container">
	// 		{/* ternary operator that checks if the data object passed as props have items in it */}
	// 		<h2>{props.data.length === 0 && props.match ? 'Sorry no match found!' : props.results}</h2>
	// 		<ul>{images}</ul>
	// 	</div>
	// );
};

export default PhotosList;
