export function reactive(obj, callback) {
  return new Proxy(obj, {
    get(target, prop) {
      const value = target[prop];

      if (typeof value === "object" && value !== null) {
        return reactive(value, callback);
      }

      return value;
    },

    set(target, prop, value) {
      const result = Reflect.set(target, prop, value);
      callback();
      return result;
    }
  });
}