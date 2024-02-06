import { render } from '@testing-library/react';

import Movement from './Movement';

describe('Movement', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Movement />);
    expect(baseElement).toBeTruthy();
  });
});
