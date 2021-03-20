export function createDefault() {
  return {
    name: "",
    token: "",
    history: [],
    likes: { actor: {}, label: {}, maker: {}, director: {}, series: {} },
    comments: { actor: {}, label: {}, maker: {}, director: {}, series: {} },
    watched: {},
    owned: {},
    subscribed: {},
    search: []
  };
}
