export function createDefault() {
  return {
    name: "",
    token: "",
    history: [],
    likes: { actor: {}, label: {}, maker: {}, director: {} },
    watched: {},
    owned: {},
    subscribed: {}
  };
}
