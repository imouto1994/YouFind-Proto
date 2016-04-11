import md5 from 'md5';

export default {
  formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
  },

  getGravatarUrl(email) {
    return `http://www.gravatar.com/avatar/${md5(email)}?d=retro`;
  },

  getThumbnailUrl(id) {
    return `http://img.youtube.com/vi/${id}/mqdefault.jpg`;
  },

  getVideoLists() {
    return [
      {
        id: 'dU3r68jWp0w',
        title: 'New Video',
        host: 'YouTube',
        date: '5 months ago',
        views: '1230000'
      },
      {
        id: 'Cbvqv19Nf0E',
        title: 'New Video',
        host: 'Vimeo',
        date: '4 days ago',
        views: '8232'
      },
      {
        id: 'QW0h3wUHFuA',
        title: 'New Video',
        host: 'DailyMotion',
        date: '12 hours ago',
        views: '94212'
      },
      {
        id: 'dU3r68jWp0w',
        title: 'New Video',
        host: 'YouTube',
        date: '5 months ago',
        views: '1230000'
      },
      {
        id: 'Cbvqv19Nf0E',
        title: 'New Video',
        host: 'Vimeo',
        date: '4 days ago',
        views: '8232'
      },
      {
        id: 'QW0h3wUHFuA',
        title: 'New Video',
        host: 'DailyMotion',
        date: '12 hours ago',
        views: '94212'
      },
      {
        id: 'dU3r68jWp0w',
        title: 'New Video',
        host: 'YouTube',
        date: '5 months ago',
        views: '1230000'
      },
      {
        id: 'Cbvqv19Nf0E',
        title: 'New Video',
        host: 'Vimeo',
        date: '4 days ago',
        views: '8232'
      },
      {
        id: 'QW0h3wUHFuA',
        title: 'New Video',
        host: 'DailyMotion',
        date: '12 hours ago',
        views: '94212'
      },
      {
        id: 'dU3r68jWp0w',
        title: 'New Video',
        host: 'YouTube',
        date: '5 months ago',
        views: '1230000'
      },
      {
        id: 'Cbvqv19Nf0E',
        title: 'New Video',
        host: 'Vimeo',
        date: '4 days ago',
        views: '8232'
      },
      {
        id: 'QW0h3wUHFuA',
        title: 'New Video',
        host: 'DailyMotion',
        date: '12 hours ago',
        views: '94212'
      }
    ];
  }
};
