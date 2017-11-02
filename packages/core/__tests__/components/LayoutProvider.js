import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';

import LayoutProvider from '../../src/components/LayoutProvider';
import Store from '../../src/store';

describe('LayoutProvider', () => {
  it('Puts layoutStore on the context', () => {
    let layoutStore;
    const ContextChecker = (props, context) => {
      layoutStore = context.layoutStore;
      return null;
    };
    ContextChecker.contextTypes = {
      layoutStore: PropTypes.instanceOf(Store).isRequired,
    };

    const node = document.createElement('div');
    const provider = mount(
      <LayoutProvider>
        <ContextChecker />
      </LayoutProvider>,
    );
    expect(layoutStore).not.toBeUndefined();
  });
});
