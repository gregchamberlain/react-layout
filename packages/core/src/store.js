// @flow
import { Map, Set, fromJS } from 'immutable';

type StoreState = Map<string, mixed>;
type Listener = StoreState => void;

class Store {
  listeners: Set<Listener>;
  state: StoreState;

  constructor(initialState: { [string]: mixed } = {}) {
    this.listeners = Set();
    this.state = fromJS(initialState);
  }

  subscribe = (listener: Listener): (() => void) => {
    this.listeners = this.listeners.add(listener);
    let isSubscribed = true;
    const unsubscribe = () => {
      if (!isSubscribed) {
        return;
      }
      this.listeners = this.listeners.remove(listener);
      isSubscribed = false;
    };
    return unsubscribe;
  };

  get = (key: string): mixed => {
    return this.state.get(key);
  };

  getIn = (keyPath: string[]): mixed => {
    return this.state.getIn(keyPath);
  };

  set = (key: string, value: mixed) => {
    const nextState = this.state.set(key, value);
    this.maybeSetState(nextState);
  };

  setIn = (keyPath: string[], value: mixed) => {
    const nextState = this.state.setIn(keyPath, value);
    this.maybeSetState(nextState);
  };

  update = (updater: (value: StoreState) => StoreState) => {
    const nextState = this.state.update(updater);
    this.maybeSetState(nextState);
  };

  updateIn = (keyPath: string[], updater: (value: mixed) => mixed) => {
    const nextState = this.state.updateIn(keyPath, updater);
    this.maybeSetState(nextState);
  };

  maybeSetState = (nextState: StoreState) => {
    if (nextState === this.state) {
      return;
    }
    this.state = nextState;
    this.listeners.forEach(listener => {
      listener(this.state);
    });
  };
}

export default Store;
