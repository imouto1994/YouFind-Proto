import React, { Component, PropTypes } from 'react';

import Utility from '../utils';

const CLASS_NAME = 'yf-video-card-horizontal';

class VideoCardHorizontal extends Component {
  static propTypes = {
    video: PropTypes.object,
    onClick: PropTypes.func
  };

  onThumbnailClick = () => {
    const { onClick } = this.props;
    return onClick && onClick();
  };

  render() {
    const { video } = this.props;
    const imageStyle = {
      backgroundImage: `url("${Utility.getThumbnailUrl(video.id)}")`
    };

    return (
      <div className={ `${CLASS_NAME} panel panel-default` }>
        <div className={ `${CLASS_NAME}-body panel-body` }>
          <div className={ `col-xs-6 ${CLASS_NAME}-thumbnail-container` } onClick={ this.onThumbnailClick }>
            <div className={ `${CLASS_NAME}-thumbnail` } style={ imageStyle } />
            <div className={ `${CLASS_NAME}-overlay` } />
          </div>
          <div className="col-xs-6">
            <div className={ `${CLASS_NAME}-title` }>
              { video.title }
            </div>
            <div className={ `${CLASS_NAME}-host` }>
              { `Hosted on ${video.host}` }
            </div>
            <div className={ `${CLASS_NAME}-date` }>
              { `Uploaded ${video.date}` }
            </div>
            <div className={ `${CLASS_NAME}-views` }>
              { `${Utility.formatNumber(video.views)} views` }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoCardHorizontal;
