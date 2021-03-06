export default {
  getDate() {
    const x = new Date();
    x.setHours(x.getHours() - x.getTimezoneOffset() / 60);
    return x;
  }
};
