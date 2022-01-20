/* eslint-disable react-hooks/exhaustive-deps */
import { APIRoute, FIRST_PAGE, Key, Links, initialStringCountValues } from '../../const';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { fetchFilteredGuitarsAction, fetchGuitarsCountAction } from '../../store/api-actions';
import { getAvailableStringCountId, getMaxPrice, getMinPrice, getStringsCountElementIdByValue, getStringsCountValueByElementId, getStringsCountValuesByGuitarTypes } from '../../utils/filter';
import { getOrder, getSort } from '../../store/search-parameters/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';

import { getInitialGuitars } from '../../store/guitar-data/selectors';

function Filter(): JSX.Element {

  const dispatch = useDispatch();
  const initialGuitars = useSelector(getInitialGuitars);
  const sort = useSelector(getSort);
  const order = useSelector(getOrder);

  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [currentTypes, setCurrentTypes] = useState<string[]>([]);
  const [currentStringCount, setCurrentStringCount] = useState<string[]>([]);
  const [currentAndAvailableStringCount, setCurrentAndAvailableStringCount] = useState<string[]>([]);
  const [availableStringCount, setAvailableStringCount] = useState<number[]>(initialStringCountValues);

  const history = useHistory();
  let filterParams = String(useLocation<string>().search);
  const indexOfSortParams = filterParams.indexOf('_sort');
  if (indexOfSortParams > 0) {
    filterParams = filterParams.substring(0, filterParams.indexOf('_sort'));
  }

  const {pageNumber} = useParams<{pageNumber: string}>();

  const minPrice = getMinPrice(initialGuitars);
  const maxPrice = getMaxPrice(initialGuitars);


  let currentPage: number;

  if (isFirstLoad && pageNumber) {
    currentPage = Number(pageNumber);
  } else {
    currentPage = FIRST_PAGE;
  }

  useEffect(() => {
    dispatch(fetchFilteredGuitarsAction(filterParams, sort, order, currentPage));
    dispatch(fetchGuitarsCountAction(filterParams));
  }, [dispatch, filterParams, order, sort, currentPage]);

  useEffect(() => {
    if (isFirstLoad) {
      return;
    }
    handleInput();
  }, [currentAndAvailableStringCount]);

  useEffect(() => {
    if (isFirstLoad) {
      return;
    }

    initialStringCountValues.forEach((value) => {
      document.getElementById(`${getStringsCountElementIdByValue(value)}`)?.setAttribute('disabled', 'true');
    });

    availableStringCount.forEach((value) => {
      document.getElementById(`${getStringsCountElementIdByValue(value)}`)?.removeAttribute('disabled');
    });

    setCurrentAndAvailableStringCount(currentStringCount.filter((element) => getAvailableStringCountId(availableStringCount).includes(element)));

  }, [availableStringCount, currentStringCount, currentTypes]);

  useEffect(() => {
    setIsFirstLoad(false);
  }, []);

  const priceMinRef = useRef<HTMLInputElement | null>(null);
  const priceMaxRef = useRef<HTMLInputElement | null>(null);

  const handleInput = () => {
    let searchInput = '?';

    if (priceMinRef.current?.value  && Number(priceMinRef.current.value) > 0) {
      searchInput += `${APIRoute.FilterPriceMin}${priceMinRef.current?.value}&`;
    }

    if (priceMaxRef.current?.value && Number(priceMaxRef.current.value) > 0) {
      searchInput += `${APIRoute.FilterPriceMax}${priceMaxRef.current?.value}&`;
    }

    currentTypes.map((type) => searchInput += `${APIRoute.FilterType}${type}&`);

    currentAndAvailableStringCount.map((stringCount) => searchInput += `${APIRoute.FilterStringCount}${getStringsCountValueByElementId(stringCount)}&`);

    searchInput += sort + order;

    currentPage = FIRST_PAGE;

    history.push(String(Links.PageByPageNumber(FIRST_PAGE, searchInput)));
  };

  const handleTypeInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      currentTypes.push(target.id);
      setCurrentTypes(currentTypes);
    } else {
      const index = currentTypes.indexOf(target.id);
      currentTypes.splice(index, 1);
    }

    if (currentTypes.length === 0) {
      setAvailableStringCount(initialStringCountValues);
    } else {
      setAvailableStringCount(getStringsCountValuesByGuitarTypes(currentTypes));
    }

    handleInput();
  };

  const handleStringCountInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      currentStringCount.push(target.id);
      setCurrentStringCount(currentStringCount);

    } else {
      const index = currentStringCount.indexOf(target.id);
      currentStringCount.splice(index, 1);
    }

    const currentAndAvailableStringCountValue = currentStringCount.filter((element) => getAvailableStringCountId(availableStringCount).includes(element));

    currentAndAvailableStringCount.splice(0);

    currentAndAvailableStringCountValue.forEach((element) => {
      currentAndAvailableStringCount.push(element);
    });

    const currentAndAvailableStringCountUnique = Array.from(new Set(currentAndAvailableStringCount));
    setCurrentAndAvailableStringCount(currentAndAvailableStringCountUnique);

    handleInput();
  };

  const handlePriceMinBlur = () => {
    if (priceMinRef.current?.value && Number(priceMinRef.current?.value) < minPrice) {
      (document.querySelector('#priceMin') as HTMLInputElement).value = String(minPrice);
    }
    handleInput();
  };

  const handlePriceMaxBlur = () => {
    if (priceMaxRef.current?.value && Number(priceMaxRef.current?.value) > maxPrice) {
      (document.querySelector('#priceMax') as HTMLInputElement).value = String(maxPrice);
    }
    handleInput();
  };

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === Key.Enter) {
      handleInput();
    }
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input
              type="number"
              placeholder={String(minPrice)}
              id="priceMin"
              name="от"
              min="0"
              ref={priceMinRef}
              onKeyPress={handleKeyPress}
              onBlur={handlePriceMinBlur}
              data-testid="priceMin"
            >
            </input>
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input
              type="number"
              placeholder={String(maxPrice)}
              id="priceMax"
              name="до"
              min="0"
              ref={priceMaxRef}
              onKeyPress={handleKeyPress}
              onBlur={handlePriceMaxBlur}
              data-testid="priceMax"
            >
            </input>
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="acoustic"
            name="acoustic"
            onInput={(event) => {
              handleTypeInput(event);
            }}
          >
          </input>
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="electric"
            name="electric"
            onInput={(event) => {
              handleTypeInput(event);
            }}
          >
          </input>
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="ukulele"
            name="ukulele"
            onInput={(event) => {
              handleTypeInput(event);
            }}
          >
          </input>
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="4-strings"
            name="4-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
          >
          </input>
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="6-strings"
            name="6-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
          >
          </input>
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="7-strings"
            name="7-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
          >
          </input>
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input
            className="visually-hidden"
            type="checkbox"
            id="12-strings"
            name="12-strings"
            onInput={(event) => {
              handleStringCountInput(event);
            }}
          >
          </input>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export default Filter;
