import RatingStars from './rating-stars';
import {render} from '@testing-library/react';

describe('Component: RatingStars', () => {
  test('should render correctly when rating = 0', () => {
    const {container} = render(<RatingStars rating={0} />);
    expect(container).toMatchSnapshot();
  });

  test('should render correctly when rating = 3', () => {
    const {container} = render(<RatingStars rating={3} />);
    expect(container).toMatchSnapshot();
  });

  test('should render correctly when rating = 5', () => {
    const {container} = render(<RatingStars rating={5} />);
    expect(container).toMatchSnapshot();
  });
});
