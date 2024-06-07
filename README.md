# LearnUp - learning management system  

## Overview ##

The Learning Management System (LMS) is a web-based application designed to facilitate the educational process by providing an online platform for teachers and students. The application supports two main roles:

* Teacher: Teachers can post assignments, review student submissions, and accept or reject these submissions.

* Student: Students can view and submit assignments for evaluation by their teachers.
  
In addition, the application includes essential functionalities like user registration and login.

## Technologies Used ##

### Frontend ###

* React: Selected for its component-based architecture, which enhances the scalability and maintainability of the application. React's efficient rendering and state management capabilities provide a smooth and responsive user experience.

* Tailwind CSS: Used for styling the application. Tailwind CSS offers a utility-first approach, allowing for rapid and flexible design without the need to write custom CSS.
  
* Material-UI: Leveraged for its comprehensive set of pre-designed components, which helps in building a consistent and visually appealing user interface quickly.

* Redux: Used for state management, allowing for a centralized store to manage the application's state, making it easier to handle complex state interactions and ensuring consistency across components.

* SockJS: Used for WebSocket implementation to ensure compatibility and fallback options in environments where native WebSocket support is not available.

* React Toastify: Used for toast notifications to provide a user-friendly and responsive way of displaying notifications and alerts within the application.


## Features ##

* User Authentication: Secure login and registration functionality for both teachers and students using JWT tokens.

Login

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/30e274b9-e8d5-4ac9-af83-1bad36ccd61a)

Register

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/f5ce7bf4-0be6-4e8e-a38a-ffdbe7e3350b)

  
* Role Management: Different functionalities and interfaces for teachers and students.

Teacher

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/8c135a80-1131-449a-a8f3-806a0dfe3b15)

Student

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/7a1d4061-c20b-4ed0-afd9-090ec7b658b0)

  
* Assignment Management:
  * Teachers can create, update, and delete assignments.

Create

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/396d4db0-618e-4b66-9f66-72427f41a272)

Update

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/d8135d55-06dc-4842-9622-5563c3a48699)

Delete

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/5a1ec793-6ad9-4674-a940-0a45d6afbf67)


    
  * Students can view available assignments.
  * Students can submit their work for review.

  ![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/10756508-e41d-49a5-a854-122b538d364b)


* Submission Management:
  * Teachers can view submitted assignments.
  * Teachers can accept or reject submissions, providing feedback if necessary.
 
  ![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/af719234-b50c-44f2-8165-1d7e7e4140b5)


### Some other screenshots ###

Notifications page with **Mark as read** function

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/30f60808-c060-409d-a9b0-11d5897cc0a1)

Assign to user

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/02415a44-5ccb-49ef-9109-22b2d644cb2e)

Sub-menu for each task (Teacher)

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/c9bc3c65-5163-4ffa-bfee-226d558f4c0b)

Sub-menu for each task (Student)

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/17e506b3-babb-47db-83a6-8a041eeb3dba)

Live notifications

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/c7445186-c5de-4483-a6a8-151168041b13)

![image](https://github.com/MrSharma619/lms-fe-app/assets/67254655/b77b6966-9ff5-46b9-965b-577c5462994f)

 

## Challenges Faced ##

* Frontend Design: Integrating Tailwind CSS and Material-UI for a seamless and visually appealing frontend while maintaining a consistent design language across the application.

## Future Features ##

* Chat System: Implement a real-time chat system to facilitate direct communication between teachers and students. This feature will leverage WebSocket technology to provide instant messaging capabilities.

* Improved UI/UX: Make the website completely responsive.


## How to Run ##
* Clone the repository.
* Open the project in VS code or any other IDE.
* Run this command in cmd.
```
npm install
```

and 

```
npm start
```
* Access the application through the provided URL.
  
```
http://localhost:3000
```


### Note ### 
If you face issue in connecting via gateway, try disabling firewall of your antivirus.

This project is built using microservices architecture.
Other services repo:

* [Eureka server](https://github.com/MrSharma619/lms-eureka-server)
* [User service](https://github.com/MrSharma619/lms-user-service)
* [Task service](https://github.com/MrSharma619/lms-task-service)
* [Submission service](https://github.com/MrSharma619/lms-submission-service)
* [Notification service](https://github.com/MrSharma619/lms-notification-service)
* [Gateway server](https://github.com/MrSharma619/lms-gateway-server)

