export const sleep = (delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1000);
    }, delay);
  });
};
