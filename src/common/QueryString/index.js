class QueryString {
  query = {};

  load = () => {
    const url = window.location.hash.split("?")[1];
    this.query = new URLSearchParams(url);
  };

  constructor() {
    this.load();
  }

  get = key => {
    this.load();
    const values = this.query.getAll(key);
    return values.length > 1 ? values : values[0];
  };

  set = (key, value) => {
    this.load();
    const query = this.query.set(key, value);
    const base = window.location.hash.split("?")[0];
    window.location.hash = `${base}?${query}`;
  };
}

export default new QueryString();
