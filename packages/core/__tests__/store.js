import { fromJS } from 'immutable';

import Store from '../src/store';

describe('Store', () => {
  let store;
  const initialState = { a: 1, b: 2, c: { a: 3 } };
  const state = fromJS(initialState);
  beforeEach(() => {
    store = new Store(initialState);
  });

  describe('constructor', () => {
    it('No initial state', () => {
      const store = new Store();
      expect(store.get('a')).toBeUndefined();
    });

    it('Initial state', () => {
      expect(store.get('a')).toEqual(1);
      expect(store.get('b')).toEqual(2);
    });
  });

  describe('getters', () => {
    let store;
    beforeEach(() => {
      store = new Store();
    });

    describe('get', () => {
      it('calls the states get', () => {
        store.state.get = jest.fn();
        store.get('a');
        expect(store.state.get).toHaveBeenCalledWith('a');
      });
    });

    describe('getIn', () => {
      it('calls the states getIn', () => {
        store.state.getIn = jest.fn();
        store.getIn(['c', 'a']);
        expect(store.state.getIn).toHaveBeenLastCalledWith(['c', 'a']);
      });
    });
  });

  describe('setters', () => {
    let listener;
    beforeEach(() => {
      listener = jest.fn();
      store.subscribe(listener);
    });

    describe('set', () => {
      it('sets a value', () => {
        store.set('a', 2);
        expect(store.get('a')).toEqual(2);
      });

      it('calls listeners with the next state', () => {
        store.set('a', 2);
        expect(listener).toHaveBeenCalledWith(state.set('a', 2));
      });

      it('does not call listeners when called with the existing value', () => {
        const listener = jest.fn();
        store.subscribe(listener);
        store.set('a', 1);
        expect(listener).not.toHaveBeenCalled();
      });
    });

    describe('setIn', () => {
      it('sets a nested value', () => {
        store.setIn(['c', 'a'], 2);
        expect(store.getIn(['c', 'a'])).toEqual(2);
      });

      it('calls listeners with the next state', () => {
        store.setIn(['c', 'a'], 2);
        expect(listener).toHaveBeenCalledWith(state.setIn(['c', 'a'], 2));
      });

      it('does not call listeners when called with the existing value', () => {
        store.setIn(['c', 'a'], 3);
        expect(listener).not.toHaveBeenCalled();
      });
    });

    describe('update', () => {
      it('updates the state', () => {
        store.update(state => state.set('a', 2));
        expect(store.get('a')).toEqual(2);
      });

      it('calls listeners with the next state', () => {
        store.update(state => state.set('a', 2));
        expect(listener).toHaveBeenCalledWith(state.set('a', 2));
      });

      it('does not call listeners when called with the existing value', () => {
        store.update(state => state.set('a', 1));
        expect(listener).not.toHaveBeenCalled();
      });
    });

    describe('updateIn', () => {
      it('updates a nested value', () => {
        store.updateIn(['c', 'a'], () => 2);
        expect(store.getIn(['c', 'a'])).toEqual(2);
      });

      it('calls listeners with the next state', () => {
        store.updateIn(['c', 'a'], () => 2);
        expect(listener).toHaveBeenCalledWith(state.setIn(['c', 'a'], 2));
      });

      it('does not call listeners when called with the existing value', () => {
        store.updateIn(['c', 'a'], () => 3);
        expect(listener).not.toHaveBeenCalled();
      });
    });
  });

  describe('subscribe', () => {
    let listener;
    let unsubscribe;
    beforeEach(() => {
      listener = jest.fn();
      unsubscribe = store.subscribe(listener);
    });
    it('returns an unsubscribe function', () => {
      expect(unsubscribe).toBeInstanceOf(Function);
    });

    it('will only subsribe a listener once', () => {
      store.subscribe(listener);
      store.set('a', 2);
      expect(listener).toHaveBeenCalledTimes(1);
    });

    describe('unsubscribe', () => {
      it('unsubscribes a listener', () => {
        store.set('a', 2);
        unsubscribe();
        store.set('a', 1);
        expect(listener).toHaveBeenCalledTimes(1);
      });
      it('does not break when trying to unsubscrube more than once', () => {
        unsubscribe();
        unsubscribe();
        store.set('a', 2);
        expect(listener).not.toHaveBeenCalled();
      });
    });
  });
});
