import { APIRoute, FIRST_PAGE, Links, initialStringCountValues } from '../../const';
import { ConnectedProps, connect } from 'react-redux';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { getMaxPrice, getMinPrice, getStringsCountElementIdByValue, getStringsCountValueByElementId, getStringsCountValuesByGuitarTypes } from '../../utils';
import { useHistory, useLocation } from 'react-router-dom';

import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { fetchFilteredGuitarsAction } from '../../store/api-actions';
import { getInitialGuitars } from '../../store/guitar-data/selectors';

const mapStateToProps = (state: State) => ({
  initialGuitars: getInitialGuitars(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onChangeFilterValue(searchParams: string) {
    dispatch(fetchFilteredGuitarsAction(searchParams));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Filter(props: PropsFromRedux): JSX.Element {
  const {onChangeFilterValue, initialGuitars} = props;

  const [currentTypes, setCurrentTypes] = useState<string[]>([]);
  const [currentStringCount, setcurrentStringCount] = useState<string[]>([]);
  const [availableStringCount, setAvailableStringCount] = useState<number[]>(initialStringCountValues);

  const history = useHistory();
  const filterParams = useLocation<string>().search;

  const minPrice = getMinPrice(initialGuitars);
  const maxPrice = getMaxPrice(initialGuitars);

  useEffect(() => {
    onChangeFilterValue(filterParams);
  }, [filterParams, onChangeFilterValue]);

  useEffect(() => {
    initialStringCountValues.forEach((value) => {
      document.getElementById(`${getStringsCountElementIdByValue(value)}`)?.setAttribute('disabled', 'true');
    });

    availableStringCount.forEach((value) => {
      document.getElementById(`${getStringsCountElementIdByValue(value)}`)?.removeAttribute('disabled');
    });
  }, [availableStringCount]);

  const priceMinRef = useRef<HTMLInputElement | null>(null);
  const priceMaxRef = useRef<HTMLInputElement | null>(null);

  const handleInput = () => {
    let searchInput = '?';

    if (priceMinRef.current?.value) {
      searchInput += `${APIRoute.FilterPriceMin}${priceMinRef.current?.value}&`;
    }

    if (priceMaxRef.current?.value) {
      searchInput += `${APIRoute.FilterPriceMax}${priceMaxRef.current?.value}&`;
    }

    currentTypes.map((type) => searchInput += `${APIRoute.FilterType}${type}&`);

    currentStringCount.map((stringCount) => searchInput += `${APIRoute.FilterStringCount}${getStringsCountValueByElementId(stringCount)}&`);

    history.push(String(Links.PageByPageNumber(FIRST_PAGE, searchInput)));

    onChangeFilterValue(searchInput);
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
  };

  const handleStringCountInput = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      currentStringCount.push(target.id);
      setcurrentStringCount(currentStringCount);
    } else {
      const index = currentStringCount.indexOf(target.id);
      currentStringCount.splice(index, 1);
    }
  };

  const handlePriceMinBlur = () => {
    if (priceMinRef.current?.value && Number(priceMinRef.current?.value) < minPrice) {
      (document.querySelector('#priceMin') as HTMLInputElement).value = String(minPrice);
    }
  };

  const handlePriceMaxBlur = () => {
    if (priceMaxRef.current?.value && Number(priceMaxRef.current?.value) > maxPrice) {
      (document.querySelector('#priceMax') as HTMLInputElement).value = String(maxPrice);
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
              onInput={handleInput}
              onBlur={handlePriceMinBlur}
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
              onInput={handleInput}
              onBlur={handlePriceMaxBlur}
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
              handleInput();
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
              handleInput();
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
              handleInput();
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
              handleInput();
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
              handleInput();
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
              handleInput();
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
              handleInput();
            }}
          >
          </input>
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
    </form>
  );
}

export {Filter};
export default connector(Filter);
