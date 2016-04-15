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
        start: 23,
        views: '904699'
      },
      {
        id: 'cYo2f7DLKX0',
        key: 1,
        title: 'iPhone SE - Snooze Edition?',
        host: 'YouTube',
        date: '5 days ago',
        start: 40,
        views: '2259021'
      },
      {
        id: '-ZWWvL7-tZ4',
        key: 2,
        title: 'iPhone SE: 5 Things Before Buying!',
        host: 'YouTube',
        date: '12 hours ago',
        start: 123,
        views: '1322021'
      },
      {
        id: '5IJWckL5L84',
        key: 3,
        title: 'HTC 10 Impressions!',
        host: 'YouTube',
        date: '2 months ago',
        start: 5,
        views: '904699122'
      },
      {
        id: 'ZvPxjhTOEgM',
        key: 4,
        title: 'Samsung Galaxy S7 Edge Review!',
        host: 'YouTube',
        date: '5 days ago',
        start: 45,
        views: '225901221'
      },
      {
        id: '1sgeM6DsV40',
        key: 5,
        title: 'Samsung Galaxy S7 Review!',
        host: 'YouTube',
        date: '12 hours ago',
        start: 79,
        views: '262422021'
      },
      {
        id: 'FVi2olFqbGk',
        key: 6,
        title: 'this could fix the iPhone 7"s biggest problem',
        host: 'YouTube',
        date: '2 weeks ago',
        start: 89,
        views: '9024699'
      },
      {
        id: '_tyhjr_f-Rw',
        key: 7,
        title: 'iPhone SE - Unboxing Every Color',
        host: 'YouTube',
        date: '2 days ago',
        start: 45,
        views: '274259021'
      },
      {
        id: 'owAWOSXvIjU',
        key: 8,
        title: 'Reasons NOT to buy iPhone SE',
        host: 'YouTube',
        date: '12 hours ago',
        start: 34,
        views: '132202112'
      }
    ];
  }
};
