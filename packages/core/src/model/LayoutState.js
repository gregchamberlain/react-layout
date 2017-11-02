// @flow
import { Record, Map, Set } from 'immutable';

const LayoutStateRecord = Record({
  itemMap: Map(),
});

class LayoutState extends LayoutStateRecord {}

export default LayoutState;
