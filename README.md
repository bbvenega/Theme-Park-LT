# Theme Park Line Tracker

*Note: The application is currently in active development. We welcome feedback and contributions to improve user experience and functionality. Also, the application is currently only available through web-browser.*

 ## About Theme Park Line Tracker 🎢

As a frequent visitor to amusement parks, I always enjoyed keeping track of the attractions I experienced. It served as a keepsake of my trips and highlighted the differences between posted and actual wait times. However, recording these memories in a simple word document felt tedious and uninspiring.

I wanted to create a more engaging and efficient way to log my amusement park visits, including details about the rides, wait times, and other unique aspects of the experience.

This led to the creation of Theme Park Line Tracker, an application designed to make tracking amusement park visits more enjoyable. The app allows users to log their visits to over **XX amusement parks**, track the attractions they ride, and record how long they wait in line. Additionally, users can set special attributes for each ride, such as using fastpasses, single rider lines, and noting any breakdown times.

Theme Park Line Tracker transforms the way amusement park enthusiasts manage their park experiences. It provides a fun, organized, and interactive way to document their adventures, enhancing the overall enjoyment of visiting theme parks.

 ## Live Webpage 🔗
 The current live version of Theme Park Line Tracker is available here. 

 ## Site 🖥️

 ### Homepage
The homepage allows users to securely log in using Okta's Auth0, ensuring a personalized and safe experience.
 

 ### Dashboard
The dashboard lists the user's visits in reverse chronological order, allowing users to either select a visit by its name and date visited or add another visit.

 ### Visit Page
The visit page displays all the attractions a user visited during the trip, including the attraction's name, original posted wait time, actual wait time, time of day, and any special attributes they added. It also allows the user to add more attractions with live wait times!

 ### Timing a Ride 
When the user selects a ride from the park's live options, they are presented with a visual stopwatch where they can track how long they've been in line. The stopwatch circle fills and turns red as it approaches the originally posted wait time. Users can also track the duration of ride breakdowns if they choose to stay in line.

 ### Editing a Ride
If there was a mistake when adding an attraction, the user can easily edit past attractions to accurately reflect their visit.

 ## Usage 🐛
 ### Bug / Feature Request

If you find any bugs or have any constructive feedback please let me know as I want to ensure everyone can enhance their theme park experiences.


 ## How was Theme Park Line Tracker Created? 🎨

### Backend 
The backend is built using Java and Spring Boot, with MySQL as the database. Spring Boot's robust networking capabilities and Java's object-oriented programming features enabled the creation of a self-sufficient database that stores live data for all supported theme parks. This data is accessed through personalized API calls, allowing for real-time updates and management of user visits and attractions.

### Frontend
The frontend is developed using ReactJS, ensuring a user-friendly and organized experience. The data presented to users on the webpage is dynamically pulled from the backend database, providing up-to-date information and seamless interaction.

## Future Features 🔜
### Average Wait Times by condition
As more users engage with the application, I plan to provide insights into the average wait times for attractions under different conditions. For instance, if a user chooses to ride **Attraction A** using a **fastpass**, the app will display the average wait time for **Attraction A** with a **fastpass**. This feature aims to help users make informed decisions about their ride choices, potentially saving them time and enhancing their park experience.

### Stats Page
With an increasing amount of user data, I aim to develop a comprehensive stats page where users can view unique statistics about their individual and overall visits. This page might include details such as the attractions you've spent the most time on, the time saved using alternative queues like fastpasses or single rider lines, and other personalized insights.

### Mobile App
In the future, I plan to transform Theme Park Line Tracker into a fully-fledged mobile app. This will offer users a smoother and more convenient experience, especially when they're live at the theme parks. The mobile app will bring the functionality of the web version to users' fingertips, making it easier to log attractions, track wait times, and enhance their overall park visit.

### Expanded Options
I also plan to expand the web application's functionality by adding more theme parks to choose from and offering enhanced customization options for tracking attractions. This will allow users to have a more tailored experience, catering to their specific interests and preferences.

