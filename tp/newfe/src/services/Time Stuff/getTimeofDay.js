// getTimeofDay returns the current time formated as HH:MM 

function getTimeofDay() {
  const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    return formattedTime;

  

}

export default getTimeofDay;