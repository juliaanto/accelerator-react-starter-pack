import { ConnectedProps, connect } from 'react-redux';
import { Order, SortBy } from '../../const';
import { SyntheticEvent, useState } from 'react';

import { ThunkAppDispatch } from '../../types/action';
import { fetchSortedGuitarsAction } from '../../store/api-actions';
import { useLocation } from 'react-router-dom';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onTypeOrOrderChange(filterParams: string, sort: string, order?: string) {
    dispatch(fetchSortedGuitarsAction(filterParams, sort, order));
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Sort(props: PropsFromRedux): JSX.Element {
  const {onTypeOrOrderChange} = props;

  const [sort, setSort] = useState<string>(SortBy.Price);
  const [order, setOrder] = useState<string>();

  const filterParams = String(useLocation<string>().search);

  const onTypeChange = (event: SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    const sortTypeButtonElements = document.querySelectorAll('.catalog-sort__type-button');

    for (const element of sortTypeButtonElements) {
      element.classList.remove('catalog-sort__type-button--active');
    }

    target.classList.toggle('catalog-sort__type-button--active');
  };

  const onOrderChange = (event: SyntheticEvent) => {
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
            setSort(SortBy.Price);
            onTypeChange(event);
            onTypeOrOrderChange(filterParams, SortBy.Price, order);
          }}
        >
          по цене
        </button>
        <button
          className="catalog-sort__type-button"
          aria-label="по популярности"
          onClick={(event) => {
            setSort(SortBy.Rating);
            onTypeChange(event);
            onTypeOrOrderChange(filterParams, SortBy.Rating, order);
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
            setOrder(Order.Asc);
            onOrderChange(event);
            onTypeOrOrderChange(filterParams, sort, Order.Asc);
          }}
        >
        </button>
        <button
          className="catalog-sort__order-button catalog-sort__order-button--down"
          aria-label="По убыванию"
          onClick={(event) => {
            setOrder(Order.Desc);
            onOrderChange(event);
            onTypeOrOrderChange(filterParams, sort, Order.Desc);
          }}
        >
        </button>
      </div>
    </div>
  );
}

export {Sort};
export default connector(Sort);