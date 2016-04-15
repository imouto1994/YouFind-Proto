import React, { PropTypes, Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import _ from 'lodash';

import Utility from '../utils';
import VideoCard from './VideoCard';

const CLASS_NAME = 'yf-action-select';
const videoResults = Utility.getVideoLists();
const actionNames = [
  'Report Violation to Hosting Site',
  'Contact Video Owner',
  'Request Linkback / Credit'
];

class ActionSelect extends Component {
  static propTypes = {
    history: PropTypes.object
  };

  constructor(props) {
    super(props);
    const selected = Cookies.getJSON('search') || [];
    this.state = {
      selectedVideos: selected.map(val => videoResults[val]),
      actions: selected.map(() => 0)
    };
  }

  onActionChange = (index, actionIndex) => {
    const actions = _.clone(this.state.actions);
    actions[index] = actionIndex;
    this.setState({
      actions
    });
  };

  onProceed = () => {
    const { history } = this.props;
    const { actions, selectedVideos } = this.state;
    const actionMap = { 0: [], 1: [], 2: [] };
    selectedVideos.forEach((video, index) => {
      actionMap[actions[index].toString()].push(video.key);
    });
    Cookies.set('actions', actionMap);
    history.push('/u/actionSubmit');
  };

  render() {
    const { selectedVideos } = this.state;

    return (
      <div className={ CLASS_NAME }>
        <div className="row yf-min-tablet-visible">
          <div className="col-sm-5">
            <h4>Selected Videos</h4>
          </div>
          <div className="col-sm-7">
            <h4>Actions</h4>
          </div>
        </div>
        <h4 className="yf-max-mobile-visible">
          Choose action for each selected video
        </h4>
        <hr />
        { selectedVideos.map(this.renderSelection.bind(this)) }
        <hr />
        <div className="row">
          <div className="col-xs-6">
            <Link className="btn btn-default" to="/u/search">
              BACK
            </Link>
          </div>
          <div className="col-xs-6">
            <button className="btn btn-primary pull-right" onClick={ this.onProceed }>
              PROCEED
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderSelection(video, index) {
    const { actions } = this.state;
    return (
      <div className="row" key={ index }>
        <div className="col-xs-12 col-sm-5">
          <VideoCard video={ video } />
        </div>
        <div className="col-xs-12 col-sm-7">
          <DropdownButton className="btn-block"
            pullRight
            title={ actionNames[actions[index]] }
            id="actionDropdown">
            <MenuItem eventKey="1"
              onClick={ () => this.onActionChange(index, 0) }
              active={ actions[index] === 0 }>
              { actionNames[0] }
            </MenuItem>
            <MenuItem eventKey="2"
              onClick={ () => this.onActionChange(index, 1) }
              active={ actions[index] === 1 }>
              { actionNames[1] }
            </MenuItem>
            <MenuItem eventKey="3"
              onClick={ () => this.onActionChange(index, 2) }
              active={ actions[index] === 2 }>
              { actionNames[2] }
            </MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

export default ActionSelect;
