import React from 'react';

// Components
import Alphabet from './Alphabet';
import Bookmarks from './Bookmarks';

const Content = (props) => {
  // console.log('Content: props...', props);
  const route = props.match.params.id ? props.match.params.id : '/';
  // console.log('Content: route...', route);

  return (
    <div className="d-flex flex-nowrap">
      <div className="gd-bm-flex-alpha">
        <Alphabet route={route} />
      </div>
      <div className="w-100">
        <Bookmarks route={route} />
      </div>
    </div>
  );
};

export default Content;
