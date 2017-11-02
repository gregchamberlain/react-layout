import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Store from '../store';

class LayoutProvider extends Component {
  constructor() {
    super();
    this.store = new Store();
  }

  getChildContext() {
    return { layoutStore: this.store };
  }

  render() {
    return this.props.children;
  }
}

LayoutProvider.childContextTypes = {
  layoutStore: PropTypes.instanceOf(Store),
};

export default LayoutProvider;
