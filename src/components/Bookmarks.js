import React, { useContext, useEffect } from 'react';
import { BookmarkContext } from '../context/BookmarkStore';
import { getMockStorage } from '../utilities/localstorage';

const Bookmarks = (props) => {
  const [state, dispatch] = useContext(BookmarkContext);

  useEffect(() => {
    dispatch({ type: 'BM_LOADING', payload: '' })
    // console.log('Bookmarks: effect...', state);

    setTimeout(() => {
      let storedData = {};
      // storedData = getLocalStorage('gd-bm-bookmarks');
      storedData = getMockStorage('gd-bm-bookmarks');
      // console.log('storedData: status...', storedData.statusOK);
      if (storedData.statusOK) {
        // console.log('Bookmarks: storedData...', storedData.data);
        dispatch({ type: 'BM_FETCHED', payload: storedData.data });
        if (state.hasChanged !== storedData.data.length) {
          dispatch({ type: 'BM_CHANGED', payload: storedData.data.length });
        }
      } else {
        dispatch({ type: 'BM_FAILURE', payload: [] });
      }
    }, 500);

    // Effect clean-up function
    return () => {
      // console.log('Bookamrks: effect cleaning up');
      return true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.route]);

  // console.log('Bookmarks: state...', state);

  return (
    <>
      {!state.isLoading ? (
        !state.isError ? (
          <div className="list-group mt-2 mr-2">
            {state.bookmarks.map((bookmark, index) => {
              if (bookmark.siteName.slice(0, 1) === props.route || props.route === '/') {
                return (
                  <div className="d-flex flex-nowrap align-items-center mb-2" key={index}>
                    <div className="w-100">
                      <a
                        className="list-group-item list-group-item-action"
                        href={bookmark.siteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >{bookmark.siteName}</a>
                    </div>
                    <div className="flex-grow-0 flex-shrink-0">
                      <i
                        className="far fa-edit mx-2 gd-bm-icon"
                        data-index={index}
                        onClick={() => { dispatch({ type: 'BM_EDIT', payload: index }) }}
                      ></i>
                      <i
                        className="far fa-trash-alt gd-bm-icon"
                        data-index={index}
                        onClick={() => { dispatch({ type: 'BM_DELETE', payload: index }) }}
                      ></i>
                    </div>
                  </div>

                );
              } else { return null }
            })}
          </div>
        ) : (
            <h1 className="text-warning text-center m-5">Oops! You have no bookmarks.</h1>
          )
      ) : (
          <h1 className="text-warning text-center m-5">Loading...</h1>
        )}
    </>
  );
};

export default Bookmarks;
