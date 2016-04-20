import React, { Component, PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import classnames from 'classnames';
import shuffle from 'lodash/shuffle';
import Cookies from 'js-cookie';

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
    isSearched: PropTypes.bool,
    searchImage: PropTypes.string,
    history: PropTypes.object
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

  onFeedbackToggle = (feedback, index) => {
    const { toggleFeedback, videos } = this.state;
    if (feedback) {
      this.setState({
        toggleFeedback: !toggleFeedback
      });
    } else {
      const filteredVideos = videos.filter((video, i) => i !== index);
      this.setState({
        toggleFeedback: !toggleFeedback,
        videos: filteredVideos
      });
    }
  };

  onOrderChange = (order) => {
    const { videos } = this.state;
    const map = this.state.checkboxes.reduce((m, v, index) => {
      m[this.state.videos[index].key] = v;
      return m;
    }, {});
    const shuffledVideos = shuffle(videos);
    const checkboxes = videos.map(v => map[v.key]);

    this.setState({
      order,
      videos: shuffledVideos,
      checkboxes
    });
  };

  onActionTaken = () => {
    const { history } = this.props;
    const { checkboxes, videos } = this.state;
    const selected = checkboxes
      .map((isChecked, index) => {
        if (isChecked) {
          return videos[index].key;
        } else {
          return undefined;
        }
      })
      .filter(v => v || v === 0);
    Cookies.set('search', selected);
    history.push('/u/actionSelect');
  };

  render() {
    const { isSearched, isUser, searchImage } = this.props;
    const { toggleFeedback, checkboxAll, togglePreview, selectedPreview, videos, checkboxes } = this.state;
    if (!isSearched) {
      return this.renderEmpty();
    }
    const classes = [
      'col-xs-6 yf-min-tablet-visible yf-margin-bottom-30',
      {
        'col-xs-offset-6': !isUser
      }
    ];

    return (
      <div className={ `${CLASS_NAME} ${CLASS_NAME}-results` }>
        {
          searchImage ?
          <div className="animated fadeInDown">
            <div className="yf-display-inline-block">
              <img className={ `${CLASS_NAME}-image` } src={ searchImage } />
            </div>
            <div className="yf-display-inline-block yf-margin-left-15 yf-vertical-align-top">
              <strong>Title: iPhone SE</strong>
              <div>Image Size: 3000 x 1500</div>
            </div>
          </div>
          : undefined
        }
        { searchImage ? <hr /> : undefined }
        { this.renderResultsHeader() }
        <hr />
        <div className="row">
          {
            isUser &&
            <div className="col-xs-6">
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={ checkboxAll } onChange={ this.onCheckboxAllChange } /> Select All
                </label>
              </div>
            </div>
          }
          <div className={ classnames(classes) }>
            <h5 className={ `${CLASS_NAME}-results-header-title pull-right` }>Is this what you were looking for?</h5>
          </div>
        </div>
        { this.renderResults() }
        {
          isUser &&
          <button onClick={ this.onActionTaken }
            className={ `${CLASS_NAME}-action btn btn-primary btn-lg pull-right` }
            disabled={ checkboxes.filter(l => l).length === 0 }>
            TAKE ACTION
          </button>
        }
        <Feedback toggle={ toggleFeedback } />
        {
          typeof selectedPreview !== 'undefined' &&
          <YouTubeModal videoId={ videos[selectedPreview].id } toggle={ togglePreview } time={ videos[selectedPreview].start || 0 } />
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
    const { videos } = this.state;
    const videoHeaderClassname = 'col-xs-12 col-sm-6';

    return (
      <div className={ `row ${CLASS_NAME}-results-header` }>
        <div className={ videoHeaderClassname }>
          <h5 className={ `${CLASS_NAME}-results-header-title` }>
            { `${videos.length} Videos Found` }
          </h5>
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
      <div className={ `row ${CLASS_NAME}-result animated fadeInLeft` } key={ index }>
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
            <button
              className="btn btn-primary btn-block" onClick={ () => this.onFeedbackToggle(true, index) }
              disabled={ checkboxes.filter(l => l).length > 1 }>
              YES
            </button>
          </div>
          <div className="col-xs-6">
            <button
              className="btn btn-default btn-block" onClick={ () => this.onFeedbackToggle(false, index) }
              disabled={ checkboxes.filter(l => l).length > 1 }>
              NO
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
