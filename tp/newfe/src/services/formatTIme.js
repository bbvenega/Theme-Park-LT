export const formatTime = (time) => {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor((time / 60) % 60);
  const hours = Math.floor(time / 3600);
  return `${hours > 0 ? `${hours} hours ` : ''}${minutes > 0 ? `${minutes} minutes and ` : ``}${seconds > 0 ? `${seconds} seconds` : `${seconds} seconds`}`;
}