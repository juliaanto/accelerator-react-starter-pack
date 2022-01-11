import { APIRouteWithVariable, Links } from '../../const';
import { Guitar, Guitars } from '../../types/guitar';
import { useRef, useState } from 'react';

import { Link } from 'react-router-dom';
import api from '../../services/api';

document.addEventListener('click', (event) => {
  const isClickInside = document.querySelector('#search')?.contains(event.target as Node);

  if (!isClickInside) {
    document.querySelector('.form-search__select-list')?.classList.add('hidden');
  }
});

function SearchForm(): JSX.Element {

  const searchRef = useRef<HTMLInputElement | null>(null);
  const [guitarNames, setGuitarNames] = useState<Guitars>();

  const handleInputAndClick = () => {
    document.querySelector('.form-search__select-list')?.classList.remove('hidden');

    const compareFirstSymbol = (firstGuitar: Guitar, secondGuitar: Guitar): number => {
      const currentValue = searchRef.current?.value.toLowerCase();
      const firstName = firstGuitar.name.substring(0, 1).toLowerCase();
      const secondName = secondGuitar.name.substring(0, 1).toLowerCase();

      if (firstName === currentValue && secondName !== currentValue) {
        return -1;
      } else if (firstName !== currentValue && secondName === currentValue) {
        return 1;
      } else {
        return 0;
      }
    };

    if (searchRef.current !== null) {
      api.get<Guitars>(APIRouteWithVariable.GuitarsBySearchText(searchRef.current.value)).then((response) => setGuitarNames((response.data.map((guitar) => guitar)).sort(compareFirstSymbol)));
    }

    if (searchRef.current?.value === '') {
      document.querySelector('.form-search__select-list')?.classList.add('hidden');
    }
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
          data-testid="search"
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

