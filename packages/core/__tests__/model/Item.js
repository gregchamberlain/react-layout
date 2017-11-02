import Item from '../../src/model/Item';

describe('Item', () => {
  it('is an item', () => {
    const item = new Item();
    item.getProps();
  });
});
