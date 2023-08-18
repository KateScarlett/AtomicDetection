import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="FaceRecognition center">
            <div className="image-box mt2">
                <img id="inputImage"
                     className="shadow-4"
                     alt=""
                     src={imageUrl}
                     width='500px'
                     height='auto'
                />
                <div className="bounding-box" style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol
                }}>
                </div>
            </div>
        </div>
    );
};

export default FaceRecognition;
