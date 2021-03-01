export default {
  history: (localStorage.history && JSON.parse(localStorage.history)) || [],
  likes: (localStorage.likes && JSON.parse(localStorage.likes)) || {
    actor: [],
    director: [],
    label: [],
    maker: [],
    tag: [],
    serie: []
  },
  watched: (localStorage.watched && JSON.parse(localStorage.watched)) || {},
  owned: (localStorage.owned && JSON.parse(localStorage.owned)) || {},
  subscribed:
    (localStorage.subscribed && JSON.parse(localStorage.subscribed)) || {}
};
