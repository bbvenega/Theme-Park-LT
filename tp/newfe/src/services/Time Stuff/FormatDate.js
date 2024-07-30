// FormatTime function to convert date to Month, Day, Year

export const FormatDate = (dateString) => {
    dateString += "T00:00:00";
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
    const year = localDate.getFullYear();
    const month = localDate.getMonth();
    const day = localDate.getDate();

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      // Converts the passed in day into the correct suffix
      const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return 'th';
        }
      };

      const monthName = monthNames[month];
      const daySuffix = getDaySuffix(day);
      console.log("Day: ", day);
      return `${monthName} ${day}${daySuffix}, ${year}`;

  };

