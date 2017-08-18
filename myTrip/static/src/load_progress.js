import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const LoadProgress = () => (
  <div className='loadProgress' >
    <CircularProgress size={60} thickness={7} />
  </div>
);

export default LoadProgress;
