import React, { Component, PropTypes } from 'react';

import Utility from '../utils';

const CLASS_NAME = 'yf-video-card';

class VideoCard extends Component {
  static propTypes = {
    video: PropTypes.object
  }

  render() {
    const { video } = this.props;
    const imageStyle = {
      backgroundImage: `url("${Utility.getThumbnailUrl(video.id)}")`
    };

    return (
      <div className={ `${CLASS_NAME} panel panel-default` }>
        <div className={ `${CLASS_NAME}-body panel-body` }>
          <div className={ `${CLASS_NAME}-thumbnail` } style={ imageStyle }>
          </div>
          <div className={ `${CLASS_NAME}-content` }>
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

export default VideoCard;
