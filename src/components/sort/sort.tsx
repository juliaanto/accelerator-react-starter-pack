import { FIRST_PAGE, Order, SortBy } from '../../const';
import { SyntheticEvent, useEffect } from 'react';
import { getOrder, getSort } from '../../store/search-parameters/selectors';
import { setOrder, setSort } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';

import { fetchFilteredGuitarsAction } from '../../store/api-actions';
import { useLocation } from 'react-router-dom';

function Sort(): JSX.Element {

  const sort = useSelector(getSort);
  const order = useSelector(getOrder);
  const dispatch = useDispatch();

  const filterParams = String(useLocation<string>().search);

  useEffect(() => {
    dispatch(fetchFilteredGuitarsAction(filterParams, sort, order, FIRST_PAGE));
  }, [sort, order, filterParams, dispatch]);

  const handleTypeChange = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    const sortTypeButtonElements = document.querySelectorAll('.catalog-sort__type-button');

    for (const element of sortTypeButtonElements) {
      element.classList.remove('catalog-sort__type-button--active');
    }

    target.classList.toggle('catalog-sort__type-button--active');
  };

  const handleOrderChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    const orderTypeButtonElements = document.querySelectorAll('.catalog-sort__order-button');

    for (const element of orderTypeButtonElements) {
      element.classList.remove('catalog-sort__order-button--active');
    }

    target.classList.toggle('catalog-sort__order-button--active');

    if (sort === SortBy.Unknown) {
      dispatch(setSort(SortBy.Price));
    }
  };

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button
          className="catalog-sort__type-button"
          aria-label="по цене"
          tabIndex={-1}
          onClick={(event) => {
            dispatch(setSort(SortBy.Price));
            handleTypeChange(event);
          }}
        >
          по цене
        </button>
        <button
          className="catalog-sort__type-button"
          aria-label="по популярности"
          onClick={(event) => {
            dispatch(setSort(SortBy.Rating));
            handleTypeChange(event);
          }}
        >
          по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button
          className="catalog-sort__order-button catalog-sort__order-button--up"
          aria-label="По возрастанию"
          tabIndex={-1}
          onClick={(event) => {
            dispatch(setOrder(Order.Asc));
            handleOrderChange(event);
          }}
        >
        </button>
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down"
          aria-label="По убыванию"
          onClick={(event) => {
            dispatch(setOrder(Order.Desc));
            handleOrderChange(event);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
