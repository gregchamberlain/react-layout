import * as EXPORTS from '../src';
import LayoutState from '../src/model/LayoutState';
import LayoutProvider from '../src/components/LayoutProvider';

describe('Package exports', () => {
  it('Exports LayoutState', () => {
    expect(EXPORTS.LayoutState).toBe(LayoutState);
  });
  it('Exports LayoutProvider', () => {
    expect(EXPORTS.LayoutProvider).toBe(LayoutProvider);
  });
});
