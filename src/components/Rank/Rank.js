import React from 'react';

const Rank = ({ name, entries }) => {
	return (
		<div>
			<div className='white f3'>
				{/*{'Jetibo, your current rank is...'}*/}
				{`${name}, your current entrie count is...`}
			</div>			
			<div className='white f1'>
				{`#${entries}`}
			</div>
		</div>
	);
}

export default Rank;