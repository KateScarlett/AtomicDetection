import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className="ImageLinkForm">
            <p className="text-shadow f3 white">
                {'Atomizing Pictures to Detect Faces'}
            </p>
            <div className="center">
                <div className="form center pa4">
                    <input type="text" className="w-70 pa2 center bn shadow-2"
                            onChange={onInputChange}/>
                    <button className="purple-button text-shadow bn grow f4 link ph3 pv2 dib white"
                            onClick={onButtonSubmit}>Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;
