export const formatMilliseconds = (time) => {
        const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
        const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
        const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
        const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
        return `${hours}:${minutes}:${seconds}:${getMilliseconds}`;
      };