import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`Hey ${name}, ton classement est le suivant...`}
            </div>
            <div className='white f1'>
                {`#${entries}`}
            </div>
        </div>
    );
};

export default Rank;