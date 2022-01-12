import { FIRST_PAGE, Links, Order, SortBy } from '../../const';
import { getOrder, getSort } from '../../store/search-parameters/selectors';
import { setOrder, setSort } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { SyntheticEvent } from 'react';

function Sort(): JSX.Element {

  const sort = useSelector(getSort);
  const order = useSelector(getOrder);
  const dispatch = useDispatch();

  const history = useHistory();
  let filterParams = String(useLocation<string>().search);
  const indexOfSortParams = filterParams.indexOf('_sort');
  if (indexOfSortParams > 0) {
    filterParams = filterParams.substring(0, filterParams.indexOf('_sort'));
  }

  const handleTypeChange = (event: SyntheticEvent, currentType: SortBy): void => {
    const target = event.target as HTMLInputElement;
    const sortTypeButtonElements = document.querySelectorAll('.catalog-sort__type-button');

    for (const element of sortTypeButtonElements) {
      element.classList.remove('catalog-sort__type-button--active');
    }

    target.classList.toggle('catalog-sort__type-button--active');

    history.push(String(Links.PageByPageNumber(FIRST_PAGE, `${filterParams ? filterParams : '?'}${currentType}${order}`)));
  };

  const handleOrderChange = (event: SyntheticEvent, currentOrder: Order) => {
    const target = event.target as HTMLInputElement;
    const orderTypeButtonElements = document.querySelectorAll('.catalog-sort__order-button');

    for (const element of orderTypeButtonElements) {
      element.classList.remove('catalog-sort__order-button--active');
    }

    target.classList.toggle('catalog-sort__order-button--active');

    if (sort === SortBy.Unknown) {
      dispatch(setSort(SortBy.Price));
    }

    history.push(String(Links.PageByPageNumber(FIRST_PAGE, `${filterParams ? filterParams : '?'}${sort ? sort : SortBy.Price}${currentOrder}`)));
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
            handleTypeChange(event, SortBy.Price);
          }}
        >
          по цене
        </button>
        <button
          className="catalog-sort__type-button"
          aria-label="по популярности"
          onClick={(event) => {
            dispatch(setSort(SortBy.Rating));
            handleTypeChange(event, SortBy.Rating);
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
            handleOrderChange(event, Order.Asc);
          }}
        >
        </button>
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down"
          aria-label="По убыванию"
          onClick={(event) => {
            dispatch(setOrder(Order.Desc));
            handleOrderChange(event, Order.Desc);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;
