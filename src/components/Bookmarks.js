import React from 'react';
import { Link } from "react-router-dom";
import { BookmarkContext } from '../context/BookmarkStore';

// Dynamic links component based on screen size
const Links = (props) => {
  return (
    <>
      <Link
        className={props.compact ? 'dropdown-item' : 'btn btn-outline-success gd-btn-action mx-2'}
        to={`/edit/${props.siteId}`}
        data-toggle="tooltip"
        data-placement="top"
        title="Edit"
      >{props.compact ? 'Edit' : (<i className="far fa-edit gd-ico-action"></i>)}</Link>
      <Link
        className={props.compact ? 'dropdown-item' : 'btn btn-outline-secondary gd-btn-action mr-2'}
        to={`/copy/${props.siteId}`}
        data-toggle="tooltip"
        data-placement="top"
        title="Copy"
      >{props.compact ? 'Copy' : (<i className="far fa-copy gd-ico-action"></i>)}</Link>
      <Link
        className={props.compact ? 'dropdown-item' : 'btn btn-outline-danger gd-btn-action'}
        to={`/delete/${props.index}~${props.siteId}`}
        data-toggle="tooltip"
        data-placement="top"
        title="Delete"
      >{props.compact ? 'Delete' : (<i className="far fa-trash-alt gd-ico-action"></i>)}</Link>
    </>
  )
}

const Bookmarks = (props) => {
  const [state, dispatch] = React.useContext(BookmarkContext);

  React.useEffect(() => {
    // dispatch({ type: 'BM_LOADING' })
    // setTimeout(() => {
    if (state.bookmarks.length > 0) {
      dispatch({ type: 'BM_LOADED' });
    } else {
      dispatch({ type: 'BM_EMPTY' });
    }
    // }, 500);
    console.log('Bookmarks: effect ran');
    // Effect clean-up function
    return () => true;
    // *eslint-disable-next-line react-hooks/exhaustive-deps*
  }, [state.bookmarks.length, dispatch]);
  // ,props.route

  // console.log('Bookmarks: state...', state);
  // console.log('Bookmarks: props...', props);

  return (
    <>
      {!state.isLoading ? (
        !state.isEmpty ? (
          <div className="list-group mt-2 mr-2">
            {state.bookmarks.map((bookmark, index) => {
              if (bookmark.siteName.slice(0, 1).toUpperCase() === props.route || props.route === '/') {
                return (
                  <div className="d-flex flex-nowrap align-items-center mb-2" key={index}>
                    <div className="w-100">
                      <a
                        className="list-group-item list-group-item-action text-monospace gd-bm-bookmark-link"
                        href={bookmark.siteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >{bookmark.siteName}</a>
                    </div>
                    <div className="flex-grow-0 flex-shrink-0">
                      <div className="d-block d-sm-block d-md-none ml-2">
                        <div className="btn-group dropleft">
                          <button
                            type="button"
                            className="btn btn-outline-secondary dropdown-toggle"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            // Fixes flicker bug: https://github.com/twbs/bootstrap/issues/28693
                            data-display="static"
                          ></button>
                          <div className="dropdown-menu">
                            <Links compact={true} siteId={bookmark.siteId} index={index} />
                          </div>
                        </div>
                      </div>
                      <div className="d-none d-sm-none d-md-block">
                        <Links compact={false} siteId={bookmark.siteId} index={index} />
                      </div>
                    </div>
                  </div>
                );
              } else { return null; }
            })}
          </div>
        ) : (
            <h4 className="text-warning text-center m-5">Oops! You have no bookmarks.</h4>
          )
      ) : (
          null
        )}
    </>
  );
};

// <h3 className="text-secondary text-center m-5">Loading...</h3>

export default Bookmarks;
