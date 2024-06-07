const flatten = (
  obj: unknown
): {
  getObject: () => unknown;
  getArray: () => string[];
  error: {
    getFirstError: () => string;
  };
} => {
  const flattenObj = Object.assign(
    {},
    ...(function flattenCore(o): unknown[] {
      return [].concat(
        ...Object.keys(o).map((k) =>
          typeof o[k] === 'object' ? flattenCore(o[k]) : { [k]: o[k] }
        )
      );
    })(obj || {})
  );

  return {
    getObject: () => flattenObj,
    getArray: () =>
      Object.keys(flattenObj).map((key) => `${key}: ${flattenObj[key]}`),
    error: {
      getFirstError: (): string => {
        if (Object.keys(flattenObj).length) {
          const k = Object.keys(flattenObj)[0];
          return flattenObj[k].replace(
            /This field/g,
            k[0].toUpperCase() + k.slice(1)
          );
        }

        return '';
      }
    }
  };
};

export { flatten };
