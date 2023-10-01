const deepFreeze = (obj) => {
  const propNames = Reflect.ownKeys(obj);
  for (const name of propNames) {
    const value = obj[name];
    const next =
      (value && typeof value === 'object') || typeof value === 'function';
    if (next) deepFreeze(value);
  }
  return Object.freeze(obj);
};

module.exports = deepFreeze;
