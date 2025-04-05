import s from './SearchBox.module.css';

const SearchBox = ({ filter, handleFilterChange }) => {
  return (
    <input
      className={s.searchInput}
      type='text'
      value={filter}
      onChange={e => handleFilterChange(e.target.value)}
      placeholder='Find contacts by name'
    />
  );
};

export default SearchBox;
