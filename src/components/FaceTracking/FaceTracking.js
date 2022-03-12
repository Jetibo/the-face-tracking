import React from 'react';
import './FaceTracking.css';

const FaceTracking = ({imageUrl, box }) => {
	console.log(box.bottomRow);
	return (
		<div className='center ma'>
			<div className ='absolute mt2'>
				<img id='inputImage' alt='' src={imageUrl} width='500px' heigh='auto'/>
				<div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
			</div>
		</div>
	);
}

export default FaceTracking;