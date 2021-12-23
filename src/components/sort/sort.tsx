import { ConnectedProps, connect } from 'react-redux';
import { FIRST_PAGE, Order, SortBy } from '../../const';
import { SyntheticEvent, useEffect } from 'react';
import { getOrder, getSort } from '../../store/search-parameters/selectors';
import { setOrder, setSort } from '../../store/action';

import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { fetchFilteredGuitarsAction } from '../../store/api-actions';
import { useLocation } from 'react-router-dom';

const mapStateToProps = (state: State) => ({
  sort: getSort(state),
  order: getOrder(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onTypeChange(sort: SortBy) {
    dispatch(setSort(sort));
  },
  onOrderChange(order: Order) {
    dispatch(setOrder(order));
  },
  onTypeOrOrderChange(filterParams: string, sort: SortBy, order: Order, pageNumber: number) {
    dispatch(fetchFilteredGuitarsAction(filterParams, sort, order, pageNumber));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Sort(props: PropsFromRedux): JSX.Element {
  const {onTypeChange, onOrderChange, onTypeOrOrderChange, sort, order} = props;

  const filterParams = String(useLocation<string>().search);

  useEffect(() => {
    onTypeOrOrderChange(filterParams, sort, order, FIRST_PAGE);
  }, [sort, order, onTypeOrOrderChange, filterParams]);

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
            onTypeChange(SortBy.Price);
            handleTypeChange(event);
          }}
        >
          по цене
        </button>
        <button
          className="catalog-sort__type-button"
          aria-label="по популярности"
          onClick={(event) => {
            onTypeChange(SortBy.Rating);
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
            onOrderChange(Order.Asc);
            handleOrderChange(event);
          }}
        >
        </button>
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down"
          aria-label="По убыванию"
          onClick={(event) => {
            onOrderChange(Order.Desc);
            handleOrderChange(event);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export {Sort};
export default connector(Sort);
