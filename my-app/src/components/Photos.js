import React from 'react';
import PhotosList from './PhotosList';

const Photos =(props) =>{
// mapping over the items of the data passed as props to the photos component
  // it returns a PhotosList component for each item mapped
  let images = props.data.map(images=>
    <PhotosList
    url={`https://farm${images.farm}.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`}
    key={images.id}/>
);
return (
    <div className="photo-container">
      {/* ternary operator that checks if the data object passed as props have items in it */}
      <h2>{ (props.data.length === 0 && props.match) ? 'Sorry no match found!' : props.results}</h2>
      <ul>
         {images}
      </ul>
    </div>
  );

}

export default Photos;
          


