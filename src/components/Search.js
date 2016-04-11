import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import Utility from '../utils';
import Feedback from './Feedback';

const CLASS_NAME = 'yf-search';

const videoResults = Utility.getVideoLists();

class Search extends Component {
  static propTypes= {
    isUser: PropTypes.bool,
    isSearched: PropTypes.bool
  };

  state = {
    checkboxAll: false,
    checkboxes: Array.apply(null, Array(videoResults.length)).map(() => false),
    toggleFeedback: false
  };

  onCheckboxAllChange = () => {
    const { checkboxAll } = this.state;
    const checkboxes = Array
      .apply(null, Array(videoResults.length))
      .map(() => !checkboxAll);
    this.setState({
      checkboxAll: !checkboxAll,
      checkboxes
    });
  };

  onCheckboxChange = (index) => {
    const checkboxes = this.state.checkboxes.slice(0);
    checkboxes[index] = !checkboxes[index];
    this.setState({
      checkboxes,
      checkboxAll: false || checkboxes.filter(m => !m).length === 0
    });
  };

  onFeedbackToggle = () => {
    const { toggleFeedback } = this.state;
    this.setState({
      toggleFeedback: !toggleFeedback
    });
  };

  render() {
    const { isSearched, isUser } = this.props;
    const { toggleFeedback } = this.state;
    if (!isSearched) {
      return this.renderEmpty();
    }

    return (
      <div className={ `${CLASS_NAME} ${CLASS_NAME}-results` }>
        { this.renderResultsHeader() }
        <hr />
        { this.renderFilter() }
        { this.renderResults() }
        { isUser && <hr /> }
        {
          isUser &&
          <div className="clearfix">
            <button className="btn btn-primary btn-lg pull-right">
              TAKE ACTIONS
            </button>
          </div>
        }
        <Feedback toggle={ toggleFeedback } />
      </div>
    );
  }

  renderEmpty() {
    return (
      <div className={ `${CLASS_NAME} ${CLASS_NAME}-empty` }>
        <h2>No search done</h2>
      </div>
    );
  }

  renderFilter() {
    return (
      <div className="clearfix yf-margin-bottom-15">
        <div className="pull-right">
          <span className="yf-margin-right-15">Ordered By</span>
          <DropdownButton pullRight title="Relevance" id="orderDropdown">
            <MenuItem eventKey="1" active>Relevance</MenuItem>
            <MenuItem eventKey="2">Date (Newest)</MenuItem>
            <MenuItem eventKey="3">Date (Oldest)</MenuItem>
            <MenuItem eventKey="4">Popularity</MenuItem>
        </DropdownButton>
        </div>
      </div>
    );
  }

  renderResultsHeader() {
    const { checkboxAll } = this.state;

    return (
      <div className={ `row ${CLASS_NAME}-results-header` }>
        <div className="col-xs-1 col-sm-1">
          <div className="checkbox">
            <label>
              <input type="checkbox" checked={ checkboxAll } onChange={ this.onCheckboxAllChange } />
            </label>
          </div>
        </div>
        <div className="col-xs-11 col-sm-5">
          <h5 className={ `${CLASS_NAME}-results-header-title` }>Videos Found</h5>
        </div>
        <div className="col-sm-6 xs-hidden">
          <h5 className={ `${CLASS_NAME}-results-header-title pull-right` }>Is this what you were looking for?</h5>
        </div>
      </div>
    );
  }

  renderResults() {
    return videoResults.map(this.renderResult.bind(this));
  }

  renderResult(video, index) {
    const { checkboxes } = this.state;
    return (
      <div className={ `row ${CLASS_NAME}-result` } key={ index }>
        <div className="col-xs-1 col-sm-1">
          <div className="checkbox">
            <label>
              <input type="checkbox"
                checked={ checkboxes[index] }
                onChange={ () => this.onCheckboxChange(index) } />
            </label>
          </div>
        </div>
        <div className="col-xs-11 col-sm-3">
          <img src={ Utility.getThumbnailUrl(video.id) } width="100%" />
        </div>
        <div className={ `col-xs-offset-1 col-xs-11 col-sm-offset-0 col-sm-4 ${CLASS_NAME}-result-info` }>
          <div className={ `${CLASS_NAME}-result-title` }>
            { video.title }
          </div>
          <div className={ `${CLASS_NAME}-result-host` }>
            { `Hosted on ${video.host}` }
          </div>
          <div className={ `${CLASS_NAME}-result-date` }>
            { `Uploaded ${video.date}` }
          </div>
          <div className={ `${CLASS_NAME}-result-views` }>
            { `${Utility.formatNumber(video.views)} views` }
          </div>
        </div>
        <div className="col-xs-offset-1 col-xs-11 col-sm-offset-0 col-sm-4">
          <div className="col-xs-6">
            <button className="btn btn-primary btn-block" onClick={ this.onFeedbackToggle }>
              YES
            </button>
          </div>
          <div className="col-xs-6">
            <button className="btn btn-default btn-block" onClick={ this.onFeedbackToggle }>
              NO
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
