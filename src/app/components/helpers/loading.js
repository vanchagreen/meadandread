import React from 'react';
import { CircularProgress } from 'material-ui';

const Loading = () => {
  return (
    <div className='loadingIndicator'>
      <CircularProgress size={50} />
    </div>
  );
};

export default Loading;
