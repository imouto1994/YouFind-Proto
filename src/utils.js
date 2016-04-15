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
        id: 'Tx_lyy4-SeY',
        key: 0,
        title: 'iPhone SE Review!',
        host: 'YouTube',
        date: '2 weeks ago',
        views: '904699'
      },
      {
        id: 'cYo2f7DLKX0',
        key: 1,
        title: 'iPhone SE - Snooze Edition?',
        host: 'YouTube',
        date: '5 days ago',
        views: '2259021'
      },
      {
        id: '-ZWWvL7-tZ4',
        key: 2,
        title: 'iPhone SE: 5 Things Before Buying!',
        host: 'YouTube',
        date: '12 hours ago',
        views: '1322021'
      },
      {
        id: 'Tx_lyy4-SeY',
        key: 3,
        title: 'iPhone SE Review!',
        host: 'YouTube',
        date: '2 weeks ago',
        views: '904699'
      },
      {
        id: 'cYo2f7DLKX0',
        key: 4,
        title: 'iPhone SE - Snooze Edition?',
        host: 'YouTube',
        date: '5 days ago',
        views: '2259021'
      },
      {
        id: '-ZWWvL7-tZ4',
        key: 5,
        title: 'iPhone SE: 5 Things Before Buying!',
        host: 'YouTube',
        date: '12 hours ago',
        views: '1322021'
      },
      {
        id: 'Tx_lyy4-SeY',
        key: 6,
        title: 'iPhone SE Review!',
        host: 'YouTube',
        date: '2 weeks ago',
        views: '904699'
      },
      {
        id: 'cYo2f7DLKX0',
        key: 7,
        title: 'iPhone SE - Snooze Edition?',
        host: 'YouTube',
        date: '5 days ago',
        views: '2259021'
      },
      {
        id: '-ZWWvL7-tZ4',
        key: 8,
        title: 'iPhone SE: 5 Things Before Buying!',
        host: 'YouTube',
        date: '12 hours ago',
        views: '1322021'
      },
      {
        id: 'Tx_lyy4-SeY',
        key: 9,
        title: 'iPhone SE Review!',
        host: 'YouTube',
        date: '2 weeks ago',
        views: '904699'
      },
      {
        id: 'cYo2f7DLKX0',
        key: 10,
        title: 'iPhone SE - Snooze Edition?',
        host: 'YouTube',
        date: '5 days ago',
        views: '2259021'
      },
      {
        id: '-ZWWvL7-tZ4',
        key: 11,
        title: 'iPhone SE: 5 Things Before Buying!',
        host: 'YouTube',
        date: '12 hours ago',
        views: '1322021'
      }
    ];
  },

  getSelectedVideos() {
    return [0, 1, 3, 5, 8, 10];
  },

  getActionVideos() {
    return [[0, 1, 3], [5, 8], [10]];
  }
};
