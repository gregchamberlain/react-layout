// @flow
import { Record, Map, List } from 'immutable';

const defaultRecord: {
  key: string,
  type: string,
  props: Map<string, mixed>,
  children: List<string | Object>,
  parent: ?string,
  pluginOptions: ?Map<string, mixed>,
} = {
  key: '',
  type: '',
  props: Map(),
  children: List(),
  parent: null,
  pluginOptions: null,
};

const ItemRecord = Record(defaultRecord);

class Item extends ItemRecord {
  getProps = (): Object => {
    return this.props.toJS();
  };
}

export default Item;
