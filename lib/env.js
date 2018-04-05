global.env = (hash, alt) => {
  if (!hash) {
    return process.env;
  }

  return process.env[hash] || alt;
};