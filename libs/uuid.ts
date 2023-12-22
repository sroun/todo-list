export const uuid = () => {
  let now = new Date().getTime();
  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    (char) => {
      // eslint-disable-next-line no-bitwise
      const round = (now + Math.random() * 16) % 16 | 0;
      now = Math.floor(now / 16);
      return (char === "x" ? round : (round & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
};
