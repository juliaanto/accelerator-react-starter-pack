import RatingStars from './rating-stars';
import {render} from '@testing-library/react';

describe('Component: RatingStars', () => {
  test('should render correctly when rating = 0', () => {
    const {container} = render(<RatingStars rating={0} width={14} height={14} />);
    expect(container).toMatchSnapshot();
  });

  test('should render correctly when rating = 3', () => {
    const {container} = render(<RatingStars rating={3} width={14} height={14} />);
    expect(container).toMatchSnapshot();
  });

  test('should render correctly when rating = 5', () => {
    const {container} = render(<RatingStars rating={5} width={14} height={14} />);
    expect(container).toMatchSnapshot();
  });
});
