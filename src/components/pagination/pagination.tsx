import { ConnectedProps, connect } from 'react-redux';
import { FIRST_PAGE, Links, PAGES_STEP } from '../../const';
import { Link, useLocation, useParams } from 'react-router-dom';

import { State } from '../../types/state';
import { ThunkAppDispatch } from '../../types/action';
import { fetchFilteredGuitarsAction } from '../../store/api-actions';
import { getFirstPageInList } from '../../utils';
import { getGuitars } from '../../store/guitar-data/selectors';
import { useEffect } from 'react';

const mapStateToProps = (state: State) => ({
  guitars: getGuitars(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onPageChange(filterParams: string, pageNumber: number) {
    dispatch(fetchFilteredGuitarsAction(filterParams, pageNumber));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function Pagination(props: PropsFromRedux): JSX.Element {
  const {onPageChange, guitars} = props;

  let {pageNumber} = useParams<{pageNumber: string}>();

  if (!pageNumber) {
    pageNumber = String(FIRST_PAGE);
  }

  const filterParams = String(useLocation<string>().search);

  const getPages = (initialPage: number) => {
    const pages = [];

    const firstPageInList = getFirstPageInList(initialPage);

    for (let i = firstPageInList; i < firstPageInList + PAGES_STEP; i++) {
      pages.push(i);
    }

    return pages;
  };

  useEffect(() => {
    onPageChange(filterParams, Number(pageNumber));
  }, [filterParams, onPageChange, pageNumber]);

  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {Number(pageNumber) > PAGES_STEP ?
          <li className="pagination__page pagination__page--prev" id="prev">
            <Link to={Links.PageByPageNumber((Number(pageNumber) - 1), filterParams)} className="link pagination__page-link">Назад</Link>
          </li>
          : ''}
        {getPages(Number(pageNumber)).map((page) => (
          <li key={`page-${page}`} className={`pagination__page ${page === Number(pageNumber) ? 'pagination__page--active' : ''}` }>
            <Link to={Links.PageByPageNumber(page, filterParams)} className="link pagination__page-link">{page}</Link>
          </li>
        ))}
        {guitars.length !== 0 ?
          <li className="pagination__page pagination__page--next" id="next">
            <Link to={Links.PageByPageNumber((getFirstPageInList(Number(pageNumber)) + PAGES_STEP), filterParams)} className="link pagination__page-link">Далее</Link>
          </li>
          : ''}
      </ul>
    </div>
  );
}

export {Pagination};
export default connector(Pagination);
