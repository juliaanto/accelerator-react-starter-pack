import LoadingScreen from './loading-screen';
import {render} from '@testing-library/react';

describe('Component: LoadingScreen', () => {
  test('should render correctly', () => {
    const {container} = render(<LoadingScreen />);
    expect(container).toMatchSnapshot();
  });
});
