import s from './SearchBox.module.css';

const SearchBox = ({ searchValue, onSearch }) => {
  return (
    <input
      className={s.searchInput}
      type='text'
      value={searchValue}
      onChange={evt => onSearch(evt.target.value)}
      placeholder='Find contacts by name'
    />
  );
};

export default SearchBox;
