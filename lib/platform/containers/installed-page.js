/** @babel */

/**
 * Copyright (c) 2016-present, PlatformIO Plus <contact@pioplus.com>
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import * as actions from '../actions';

import { INSTALLED_INPUT_FILTER_KEY, getInstalledFilter, getVisibleInstalledPlatforms } from '../selectors';

import { INPUT_FILTER_DELAY } from '../../config';
import PlatformsList from '../components/platforms-list';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goTo } from '../../home/helpers';
import { lazyUpdateInputValue } from '../../home/actions';


class PlatformInstalledPage extends React.Component {

  static propTypes = {
    items: React.PropTypes.arrayOf(
      React.PropTypes.object.isRequired
    ),
    filterValue: React.PropTypes.string.isRequired,
    setFilter: React.PropTypes.func.isRequired,
    loadInstalledPlatforms: React.PropTypes.func.isRequired,
    showPlatform: React.PropTypes.func.isRequired,
    showFramework: React.PropTypes.func.isRequired,
    uninstallPlatform: React.PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.loadInstalledPlatforms();
  }

  render() {
    return (
      <div>
        <div className='block'>
          <span className='icon icon-question'></span>Project can depend on a specific version of development platform, please use <kbd>platform = name@x.y.z</kbd> option for <b>platformio.ini</b> in this case. <a href='http://docs.platformio.org/page/projectconf.html#platform'>More details...</a>
        </div>
        <PlatformsList { ...this.props } actions={ ['reveal', 'uninstall'] } />
      </div>
    );
  }

}

// Redux

function mapStateToProps(state, ownProps) {
  return {
    items: getVisibleInstalledPlatforms(state),
    filterValue: getInstalledFilter(state),
    showPlatform: name => goTo(ownProps.history, '/platform/installed/show', { name }),
    showFramework: name => goTo(ownProps.history, '/platform/frameworks/show', { name })
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, actions, {
    setFilter: value => dispatch(lazyUpdateInputValue(INSTALLED_INPUT_FILTER_KEY, value, INPUT_FILTER_DELAY))
  }), dispatch);
}

function mergeProps(stateProps, dispatchProps) {
  return Object.assign({}, stateProps, dispatchProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(PlatformInstalledPage);
