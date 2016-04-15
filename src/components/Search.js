import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { Link } from 'react-router';
import _ from 'lodash';

import Utility from '../utils';
import Feedback from './Feedback';
import VideoCardHorizontal from './VideoCardHorizontal';
import VideoCard from './VideoCard';
import YouTubeModal from './YouTubeModal';

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
    toggleFeedback: false,
    togglePreview: false,
    selectedPreview: undefined,
    videos: videoResults,
    order: 'Relevance'
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

  onVideoPreview = (index) => {
    this.setState({
      togglePreview: !this.state.togglePreview,
      selectedPreview: index
    });
  };

  onFeedbackToggle = () => {
    const { toggleFeedback } = this.state;
    this.setState({
      toggleFeedback: !toggleFeedback
    });
  };

  onOrderChange = (order) => {
    const map = this.state.checkboxes.reduce((m, v, index) => {
      m[this.state.videos[index].key] = v;
      return m;
    }, {});
    const videos = _.shuffle(videoResults);
    const checkboxes = videos.map(v => map[v.key]);

    this.setState({
      order,
      videos,
      checkboxes
    });
  };

  render() {
    const { isSearched, isUser } = this.props;
    const { toggleFeedback, togglePreview, selectedPreview, videos } = this.state;
    if (!isSearched) {
      return this.renderEmpty();
    }

    return (
      <div className={ `${CLASS_NAME} ${CLASS_NAME}-results` }>
        { this.renderResultsHeader() }
        <hr />
        <div className="col-sm-offset-6 col-sm-6 yf-min-tablet-visible yf-margin-bottom-30">
          <h5 className={ `${CLASS_NAME}-results-header-title pull-right` }>Is this what you were looking for?</h5>
        </div>
        { this.renderResults() }
        { isUser && <hr /> }
        {
          isUser &&
          <div className="clearfix">
            <Link to="/u/actionSelect" className="btn btn-primary pull-right">
              TAKE ACTION
            </Link>
          </div>
        }
        <Feedback toggle={ toggleFeedback } />
        {
          typeof selectedPreview !== 'undefined' &&
          <YouTubeModal videoId={ videos[selectedPreview].id } toggle={ togglePreview } />
        }
      </div>
    );
  }

  renderEmpty() {
    return (
      <div className={ `${CLASS_NAME} ${CLASS_NAME}-empty` }>
        <h2>Please input search...</h2>
      </div>
    );
  }

  renderFilter() {
    const { order } = this.state;
    return (
      <div className="clearfix">
        <div className="pull-right">
          <span className="yf-margin-right-15">Ordered By</span>
          <DropdownButton pullRight title={ order } id="orderDropdown">
            <MenuItem eventKey="1" active={ order === 'Relevance' }
              onClick={ () => this.onOrderChange('Relevance') }>
              Relevance
            </MenuItem>
            <MenuItem eventKey="2" active={ order === 'Date (Newest)' }
              onClick={ () => this.onOrderChange('Date (Newest)') }>
              Date (Newest)
            </MenuItem>
            <MenuItem eventKey="3" active={ order === 'Date (Oldest)' }
              onClick={ () => this.onOrderChange('Date (Oldest)') }>
              Date (Oldest)
            </MenuItem>
            <MenuItem eventKey="4" active={ order === 'Popularity' }
              onClick={ () => this.onOrderChange('Popularity') }>
              Popularity
            </MenuItem>
          </DropdownButton>
        </div>
      </div>
    );
  }

  renderResultsHeader() {
    const { checkboxAll } = this.state;
    const { isUser } = this.props;
    const videoHeaderClassname = isUser
      ? 'col-xs-11 col-sm-5'
      : 'col-xs-12 col-sm-6';

    return (
      <div className={ `row ${CLASS_NAME}-results-header` }>
        {
          isUser &&
          <div className="col-xs-1 col-sm-1">
            <div className="checkbox">
              <label>
                <input type="checkbox" checked={ checkboxAll } onChange={ this.onCheckboxAllChange } />
              </label>
            </div>
          </div>
        }
        <div className={ videoHeaderClassname }>
          <h5 className={ `${CLASS_NAME}-results-header-title` }>Videos Found</h5>
        </div>
        <div className="col-sm-6">
          { this.renderFilter() }
        </div>
      </div>
    );
  }

  renderResults() {
    return this.state.videos.map(this.renderResult.bind(this));
  }

  renderResult(video, index) {
    const { checkboxes } = this.state;
    const { isUser } = this.props;
    const videoHorizontalClassname = isUser
      ? 'col-xs-11 col-sm-7 yf-min-tablet-visible'
      : 'col-xs-12 col-sm-8 yf-min-tablet-visible';
    const videoClassname = isUser
      ? 'col-xs-11 col-sm-7 yf-max-mobile-visible'
      : 'col-xs-12 col-sm-8 yf-max-mobile-visible';
    const feedbackClassname = isUser
      ? 'col-xs-offset-1 col-xs-11 col-sm-offset-0 col-sm-4'
      : 'col-xs-12 col-sm-4';

    return (
      <div className={ `row ${CLASS_NAME}-result` } key={ index }>
        {
          isUser &&
          <div className="col-xs-1 col-sm-1">
            <div className="checkbox">
              <label>
                <input type="checkbox"
                  checked={ checkboxes[index] }
                  onChange={ () => this.onCheckboxChange(index) } />
              </label>
            </div>
          </div>
        }
        <div className={ videoHorizontalClassname }>
          <VideoCardHorizontal video={ video } onClick={ () => this.onVideoPreview(index) } />
        </div>
        <div className={ videoClassname }>
          <VideoCard video={ video } onClick={ () => this.onVideoPreview(index) } />
        </div>
        <div className={ feedbackClassname }>
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
