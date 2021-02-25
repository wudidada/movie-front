import { suggest } from "./Api";

export default {
  suggest(text) {
    const data = {
      query: {
        query_string: {
          query: text
        }
      }
    };
    return suggest.post("", data);
  }
};
