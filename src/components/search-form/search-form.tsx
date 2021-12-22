import { APIRouteWithVariable, Links } from '../../const';
import { useRef, useState } from 'react';

import { Guitars } from '../../types/guitar';
import { Link } from 'react-router-dom';
import api from '../../services/api';

function SearchForm(): JSX.Element {

  const searchRef = useRef<HTMLInputElement | null>(null);
  const [guitarNames, setGuitarNames] = useState<Guitars>();

  const handleInputAndClick = () => {
    document.querySelector('.form-search__select-list')?.classList.remove('hidden');

    if (searchRef.current !== null) {
      api.get<Guitars>(APIRouteWithVariable.GuitarsBySearchText(searchRef.current.value)).then((response) => setGuitarNames(response.data.map((guitar) => guitar)));
    }

    if (searchRef.current?.value === '') {
      document.querySelector('.form-search__select-list')?.classList.add('hidden');
    }
  };

  const handleBlur = () => {
    document.querySelector('.form-search__select-list')?.classList.add('hidden');
  };

  return (
    <div className="form-search">
      <form className="form-search__form">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input
          className="form-search__input"
          id="search"
          type="text"
          autoComplete="off"
          placeholder="что вы ищите?"
          ref={searchRef}
          onInput={handleInputAndClick}
          onClick={handleInputAndClick}
          onBlur={handleBlur}
        >
        </input>
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className="form-search__select-list hidden">
        {guitarNames?.map((guitar) => (
          <Link to={Links.ProductById(guitar.id)} key={guitar.id} className="form-search__select-item" tabIndex={0}>
            <li>{guitar.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default SearchForm;

