import { faCircleXmark, faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef } from 'react';

import styles from './Search.module.scss';
import { Wrapper as PopperWrapper } from '../../../components/Popper';
import AccountItem from '../../../components/AccountItem';
import { useDebounce } from '~/hooks';
import * as searchServices from '~/services/searchServices';

const cx = classNames.bind(styles);

function Search() {
   const [searchValue, setSearchValue] = useState('');
   const [searchResult, setSearchResult] = useState([]);
   const [showResult, setShowResult] = useState(true);
   const [loading, setLoading] = useState(false);

   const debounced = useDebounce(searchValue, 600);

   const inputRef = useRef();

   const handleClearSearch = () => {
      setSearchValue('');
      setSearchResult([]);
      inputRef.current.focus();
   };

   const handleHileResult = () => {
      setShowResult(false);
   };

   useEffect(() => {
      if (!debounced.trim()) {
         setSearchResult([]);
         return;
      }

      const fetchApi = async () => {
         setLoading(true);

         const result = await searchServices.search(debounced);
         setSearchResult(result);

         setLoading(false);
      };

      fetchApi();
   }, [debounced]);

   const handleChange = (e) => {
      const inputValue = e.target.value;
      if (!inputValue.startsWith(' ')) {
         setSearchValue(inputValue);
      }
   };

   return (
      <div>
         <HeadlessTippy
            visible={showResult && searchResult.length > 0}
            interactive={true}
            onClickOutside={handleHileResult}
            render={(attrs) => (
               <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                  <PopperWrapper>
                     <h4 className={cx('search-title')}>Accounts</h4>
                     {searchResult.map((result) => (
                        <AccountItem key={result.id} data={result} />
                     ))}
                  </PopperWrapper>
               </div>
            )}
         >
            <div className={cx('search')}>
               <input
                  ref={inputRef}
                  value={searchValue}
                  placeholder="Search accounts and videos"
                  spellCheck={false}
                  onChange={handleChange}
                  onFocus={() => setShowResult(true)}
               />
               {!!searchValue && !loading && (
                  <button className={cx('clear')} onClick={handleClearSearch}>
                     <FontAwesomeIcon icon={faCircleXmark} />
                  </button>
               )}
               {loading && (
                  <button className={cx('loading')}>
                     <FontAwesomeIcon className={cx('spinner')} icon={faSpinner} />
                  </button>
               )}
               <button className={cx('search-button')} onMouseDown={(e) => e.preventDefault()}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
               </button>
            </div>
         </HeadlessTippy>
      </div>
   );
}

export default Search;
