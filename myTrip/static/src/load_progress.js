import React from 'react';

import CircularProgress from 'material-ui/CircularProgress';
import './layout.less';

const LoadProgress = () => (
    <div className='loadProgress' >
            <CircularProgress size={60} thickness={7} />
    </div>
);

export default LoadProgress;
