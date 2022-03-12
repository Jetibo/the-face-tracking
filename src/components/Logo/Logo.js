import React from 'react';
import Tilt from 'react-parallax-tilt';
import face from './face-detection.png';
import './Logo.css';

const Logo = () => {
	return (
		<div className='mw4 min-vh-10 ma4 mt0'>
  			<Tilt
			    className="Tilt br2 shadow-2 .mw1"
			    tiltMaxAngleX={35}
			    tiltMaxAngleY={35}
			    perspective={900}
			    scale={1.1}
			    transitionSpeed={2000}
			    gyroscope={true}>
  				<img alt='logo' src={face} />
  			</Tilt>
		</div>
	);
}

export default Logo;