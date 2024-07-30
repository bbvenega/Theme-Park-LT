# Theme Park Line Tracker

*Note: The application is currently in active development. We welcome feedback and contributions to improve user experience and functionality. Also, the application is currently only available through web-browser.*

 ## About Theme Park Line Tracker 🎢

As a frequent visitor to amusement parks, I always enjoyed keeping track of the attractions I experienced. It served as a keepsake of my trips and highlighted the differences between posted and actual wait times. However, recording these memories in a simple word document felt tedious and uninspiring.

I wanted to create a more engaging and efficient way to log my amusement park visits, including details about the rides, wait times, and other unique aspects of the experience.

This led to the creation of Theme Park Line Tracker, an application designed to make tracking amusement park visits more enjoyable. The app allows users to log their visits to over **80 amusement parks** and **2,950 attractions**, track the attractions they ride, and record how long they wait in line. Additionally, users can set special attributes for each ride, such as using fastpasses, single rider lines, and noting any breakdown times.

Theme Park Line Tracker transforms the way amusement park enthusiasts manage their park experiences. It provides a fun, organized, and interactive way to document their adventures, enhancing the overall enjoyment of visiting theme parks.

 ## Live Webpage 🔗
 The current live version of Theme Park Line Tracker is available here. 

 ## Site 🖥️

 ### Homepage
The homepage offers a secure login experience using Okta's Auth0, ensuring your data's safety and privacy. Once logged in, you can access our web-based platform to track real-time wait times for rides at various theme parks.

![TPLT Home Page](https://github.com/user-attachments/assets/c83d01b4-3ca8-466d-b177-d7f8f7209403)



 ### Dashboard
The dashboard provides a personalized view of your theme park visits, allowing you to manage and track your experiences easily.

![TPLT Dashboard](https://github.com/user-attachments/assets/7c058f64-2c48-4ac0-8f99-17c5de6c7c83) ![TPLT Add Visit Modal](https://github.com/user-attachments/assets/7186ee92-8a50-45eb-a765-6d1f6682281b)



 ### Visit Page
The Visit Page offers a detailed overview of all the attractions you experienced during your theme park visit. It displays each ride's name, posted wait time, and your actual wait time, allowing you to compare and analyze your experience. You can also add new attractions with live wait times, specifying details such as the type of line you used (e.g., single rider or fastpass). Additionally, the page includes a timer feature to help you track and record wait times accurately, along with the option to add notes about each ride for a personalized visit log.

![TPLT VisitPage](https://github.com/user-attachments/assets/a62f2faf-7fd7-44c9-a7b0-740ef2de0939) ![TPLT Visited Attractions](https://github.com/user-attachments/assets/fee9d80f-369d-4b11-a4d3-f4e1733cdf62) ![TPLT Help](https://github.com/user-attachments/assets/f5afdadf-063a-4525-8e27-52031f6c3fbc)

### Adding a Ride
To enhance your visit log, you can add new rides by selecting from a comprehensive list of attractions currently available at the theme park. The list is organized alphabetically, and each ride's live wait time is displayed for easy reference. After selecting a ride, you can indicate if you used a fastpass or single rider line to modify the wait time data. This feature helps you maintain an accurate and detailed record of your theme park experiences.

![TPLT Add Attraction Modal](https://github.com/user-attachments/assets/34c41e92-142c-441b-ac43-d1182436ac4f) !TPLT Add Attraction Modal)](https://github.com/user-attachments/assets/5a41fa0b-8bb0-4831-9b25-0bb9be30bcf5)

 ### Timing a Ride 
The "Timing a Ride" feature allows you to track your actual wait time for each attraction. Upon selecting a ride, a visual stopwatch appears, filling up and changing color as it approaches the originally posted wait time. This helps you monitor your wait duration and compare it with the park's estimates. Additionally, the feature includes a breakdown timer, enabling you to record any delays experienced during your wait. This detailed timing data enhances your visit logs and provides valuable insights for future visits.

![TPLT Timing Ride (GREEN)](https://github.com/user-attachments/assets/128a5b3d-585c-4905-8562-0340834ddc7e) ![TPLT Timing Ride (RED)](https://github.com/user-attachments/assets/cb66241f-b6f0-4be9-9394-b359973c13f8) ![TPLT Breakdown Timer](https://github.com/user-attachments/assets/d9337319-ac06-4aef-87cb-7ee8fcc1dacb)


 ### Editing a Ride
The "Editing a Ride" feature allows users to correct any mistakes made when adding an attraction. Users can easily update the posted and actual wait times, as well as specify if they used a fastpass or single rider line. This ensures that their visit log accurately reflects their experience, providing precise data for personal records and future planning.

![TPLT Edit Attraction](https://github.com/user-attachments/assets/6742bc0b-59d3-4432-bb52-2248a8540cbc)



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

