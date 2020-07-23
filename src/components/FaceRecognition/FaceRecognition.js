import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt3'>
                <img id='inputImage' src={imageUrl} alt={imageUrl} width='500px' height='auto'/>
                {  
                    boxes.map(box => {
                        return (<div 
                            key={box.key}
                            className='bounding-box' 
                            style={{
                                top: box.topRow, 
                                right: box.rightCol,
                                bottom: box.bottomRow,
                                left: box.leftCol
                                        }}
                            ></div>);
                    }) 
                }
                
            </div>
        </div>
    );
};



export default FaceRecognition;