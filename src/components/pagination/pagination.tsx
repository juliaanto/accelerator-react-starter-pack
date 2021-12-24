import { ConnectedProps, connect } from 'react-redux';
import { FIRST_PAGE, Links, PAGES_STEP } from '../../const';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchFilteredGuitarsAction, fetchGuitarsCountAction } from '../../store/api-actions';
import { getFirstPageInList, getMaxPage, getRestGuitarsCount } from '../../utils/pagination';
import { getOrder, getSort } from '../../store/search-parameters/selectors';

import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { getGuitarsCount } from '../../store/guitar-data/selectors';
import { useEffect } from 'react';

const mapStateToProps = (state: State) => ({
  guitarsCount: getGuitarsCount(state),
  sort: getSort(state),
  order: getOrder(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onPageChange(filterParams: string, sort: string, order: string, pageNumber: number) {
    dispatch(fetchFilteredGuitarsAction(filterParams, sort, order, pageNumber));
    dispatch(fetchGuitarsCountAction(filterParams));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Pagination(props: PropsFromRedux): JSX.Element {
  const {onPageChange, guitarsCount, sort, order} = props;

  const {pageNumber} = useParams<{pageNumber: string}>();

  const currentPage = pageNumber ? Number(pageNumber) : FIRST_PAGE;

  const filterParams = String(useLocation<string>().search);

  const getPages = (initialPage: number) => {
    const pages = [];

    const firstPageInList = getFirstPageInList(initialPage);

    for (let i = firstPageInList; i < firstPageInList + PAGES_STEP && i <= getMaxPage(guitarsCount); i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    onPageChange(filterParams, sort, order, currentPage);
  }, [filterParams, onPageChange, currentPage, sort, order]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage > PAGES_STEP ?
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link to={Links.PageByPageNumber((getFirstPageInList(currentPage) - PAGES_STEP), filterParams)} className="link pagination__page-link">Назад</Link>
          </li>
          : ''}
        {getPages(currentPage).map((page) => (
          <li key={`page-${page}`} className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}` }>
            <Link to={Links.PageByPageNumber(page, filterParams)} className="link pagination__page-link">{page}</Link>
          </li>
        ))}
        {getRestGuitarsCount(guitarsCount, currentPage) > 0 ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link to={Links.PageByPageNumber((getFirstPageInList(currentPage) + PAGES_STEP), filterParams)} className="link pagination__page-link">Далее</Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}

export {Pagination};
export default connector(Pagination);
