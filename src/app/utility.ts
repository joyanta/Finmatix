function trimObjectValues(obj: {[key: string]: string}): {[key: string]: string} {
    return Object.entries(obj).reduce((acc: {[key: string]: string}, [key, value]: [string, string]) => {
      acc[key] = value.trim();
      return acc;
    }, {});
  }
  