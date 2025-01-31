import { AppLink, FIRST_PAGE, PAGES_STEP } from '../../const';
import { Link, useLocation, useParams } from 'react-router-dom';
import { fetchFilteredGuitarsAction, fetchGuitarsCountAction } from '../../store/api-actions';
import { getFirstPageInList, getMaxPage } from '../../utils/pagination';
import { getOrder, getSort } from '../../store/search-parameters/selectors';
import { useDispatch, useSelector } from 'react-redux';

import { getGuitarsCount } from '../../store/guitar-data/selectors';
import { useEffect } from 'react';

function Pagination(): JSX.Element {

  const guitarsCount = useSelector(getGuitarsCount);
  const sort = useSelector(getSort);
  const order = useSelector(getOrder);
  const dispatch = useDispatch();

  const {pageNumber} = useParams<{pageNumber: string}>();

  const currentPage = pageNumber ? Number(pageNumber) : FIRST_PAGE;

  let filterParams = String(useLocation<string>().search);
  const indexOfSortParams = filterParams.indexOf('_sort');
  if (indexOfSortParams > 0) {
    filterParams = filterParams.substring(0, filterParams.indexOf('_sort'));
  }

  const getPages = (initialPage: number) => {
    const pages = [];

    const firstPageInList = getFirstPageInList(initialPage);

    for (let i = firstPageInList; i < firstPageInList + PAGES_STEP && i <= getMaxPage(guitarsCount); i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    dispatch(fetchFilteredGuitarsAction(filterParams, sort, order, currentPage));
    dispatch(fetchGuitarsCountAction(filterParams));
  }, [currentPage]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {currentPage > FIRST_PAGE ?
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link to={AppLink.PageByPageNumber((currentPage - 1), filterParams)} className="link pagination__page-link">Назад</Link>
          </li>
          : ''}
        {getPages(currentPage).map((page) => (
          <li key={`page-${page}`} className={`pagination__page ${page === currentPage ? 'pagination__page--active' : ''}` }>
            <Link to={AppLink.PageByPageNumber(page, filterParams)} className="link pagination__page-link">{page}</Link>
          </li>
        ))}
        {currentPage < getMaxPage(guitarsCount) ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link to={AppLink.PageByPageNumber((currentPage + 1), filterParams)} className="link pagination__page-link">Далее</Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}

export default Pagination;
