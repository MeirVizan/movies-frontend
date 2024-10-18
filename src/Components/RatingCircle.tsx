import React from 'react';
import './RatingCircle.css'; // Import the CSS for styling

interface RatingCircleProps {
    vote_average: number;
    }

const RatingCircle: React.FC<RatingCircleProps> = ({ vote_average }) => {
  const percentage = Math.round(vote_average * 10);

  return (
    <div className="rating-circle">
      <svg className="circle-svg">
        <circle className="background-circle" cx="22" cy="22" r="21" />
        <circle
          className="progress-circle"
          cx="22"
          cy="22"
          r="21"
          style={{ strokeDashoffset: `calc(113 - (113 * ${percentage}) / 100)` }}
        />
      </svg>
      <div className="rating-text">
        {percentage}
        <span className="percentage-symbol">%</span>
      </div>
    </div>
  );
};

export default RatingCircle;
