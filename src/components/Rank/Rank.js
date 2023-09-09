import React from 'react';
import './Rank.css';

const Rank = ({name, entries}) => {

    return (
        <div className="Rank">
            <div className="text-shadow white f1">
                <b>{' ~ Atomic ~'}</b>
            </div>
            <div className="text-shadow white f4">
                {'powered by Clarifai'}
            </div>
            <div className="pt3 text-shadow white f6">
                Entries: {name} - {entries}
            </div>
        </div>
    );
};

export default Rank;
