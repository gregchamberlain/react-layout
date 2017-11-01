import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Store from '../store';

class LayoutProvider extends Component {
  constructor() {
    super();
    this.store = new Store();
  }
}

LayoutProvider.childContextTypes = {
  store: PropTypes.instanceOf(Store),
};
