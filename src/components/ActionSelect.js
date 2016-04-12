import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';

import Utility from '../utils';
import VideoCard from './VideoCard';

const CLASS_NAME = 'yf-action-select';
const videoResults = Utility.getVideoLists();
const selectedVideos = Utility.getSelectedVideos().map(val => videoResults[val]);

class ActionSelect extends Component {
  render() {
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
            <Link className="btn btn-primary pull-right" to="/u/actionSubmit">
              PROCEED
            </Link>
          </div>
        </div>
      </div>
    );
  }

  renderSelection(video, index) {
    return (
      <div className="row" key={ index }>
        <div className="col-xs-12 col-sm-5">
          <VideoCard video={ video } />
        </div>
        <div className="col-xs-12 col-sm-7">
          <DropdownButton className="btn-block" pullRight title="Report Violation to Hosting Site" id="actionDropdown">
            <MenuItem eventKey="1" active>Report Violation to Hosting Site</MenuItem>
            <MenuItem eventKey="2">Contact Video Owner</MenuItem>
            <MenuItem eventKey="3">Request Linkback / Credit</MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }
}

export default ActionSelect;
