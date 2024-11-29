**_Animal Adoption Network_**

Deployed in:
https://animaladoptionnetwork.vercel.app/


A NextJS - MongoDB project
The Animal Adoption Network is a dedicated platform that connects loving animals with their forever homes.

**Objective:**
A web application to help find homes for animals in shelters and rescue homes.

**Brief Description:**
A web application designed to help animals in shelters and rescue homes find new families. The platform will support two types of users: shelters/rescuers and adopting parents. Shelters can create profiles, publish animals for adoption, and manage their dashboards, while adopting parents can browse and filter animals based on characteristics like species, gender and location. Key features include user authentication and authorization, animal profiles, adoption applications, custom lists and mobile responsiveness.

**Target Audience:**
The primary target audience for the Animal Adoption Network comprehends 2 groups:

- Animal shelters and rescue homes: These organizations rely on finding suitable homes for the animals in their care. The network is open to any Canadian registered Animal Shelters and temporal homes or rescuers associated with shelters.
- Potential pet adopters: Individuals or families looking to adopt a pet. They must be Canadian residents, at least 18 years old and provide proof of income as a requirement for adopting. They must also provide personal references and information on previous pets amongst other form fields required.

**Technology Stack:**
Frontend: React / Next.js / Tailwind
Backend: Next.js / MongoDB +
Bcrypt / Mongoose / JWT (amongst others)
External Apis: Google Maps

**Key Features:**
User Profiles / Authorization

- Shelters and rescuers are the first user role, they create accounts enabled to create animal profiles. - Register + Login - Dashboard Management UI - Uploading form - Session handling
- Adopting Parents are the second role, they can browse through the animal database, filter it and submit adopting applications. - Register + Login - Browsing UI with filtering options - Session handling
- Animal Profiles
  Animal profiles with detailed information about each animal that will provide filtering options (species, size, name, breed, age, personality, etc.).
  Animal data will be fetched from the database and displayed in a user-friendly format. Including images of the animals.
- Adoption Applications:
  Creating a form for users to submit their information.
  Storing application data in the database, and notifying shelters.
- APIs Integration:
  Google maps for shelter locations.


**Work Breakdown Structure**

**Roger:** Authentication & User Roles

- Key Focus: User profiles, authentication, and role-based access.
- User Registration and Login (Shelters and Adopting Parents)
  Task: Implement user registration and login pages for Adopters. **DONE (by Ryan)**
  Task: Implement user registration and login pages for Shelters.**DONE**
  Task: Set up user roles (shelters and adopting parents). **DONE (by Ryan and Roger)**
  Task: Use Bcrypt for password hashing, implement authentication and authorization logic. **DONE**
  Task: Set up session management, JWT tokens for authentication. **DONE**
- Shelter/Rescuer Dashboard Management UI
  Task: Build the dashboard UI for shelters to manage their profiles and the animals they publish. **DONE**
  Task: Integrate with the backend to fetch shelter details and manage their data. **DONE (By Sara)**
- Adopting Parent Browsing UI
  Task: Implement UI for browsing animals, including filters (species, age, etc.). **DONE**
  Task: Use MongoDB/Mongoose to fetch animals and apply filtering logic on the frontend. **DONE**
- Implementing Lovelist to hold prefered animals **DONE**

**Ryan:** Animal Profiles & Database Integration

- Key Focus: Animal profiles, search functionality, and database setup.
- Animal Profiles (Detailed Information with Filtering)
  Task: Create the UI components for displaying animal profiles (e.g., species, breed, images). **Done (By Roger)**
  Task: Implement filtering functionality (species, age, location, etc.) for adopters. **Done (By Sara)**
- Backend: Animal Data Storage & Fetching 
  Task: Set up MongoDB collections for animals, shelters, and adopters. **DONE**
  Task: Implement Mongoose models for the animals. **DONE**
  Task: Implement API routes to fetch animal data and handle filtering queries. **DONE**
  Task: Enabling management of animals editing/deleting.***DONE**
- Image Upload
  Task: Implement image upload for animal profiles. **DONE for 1 pic (by Roger)**

**Saraben:** Adoption Applications & API Integrations

- Key Focus: Forms, API integrations, and notifications.
- Adoption Application Form
  Task: Build a form for adopters to submit their adoption applications. **DONE**
  Task: Set up validation to ensure all necessary fields are filled in. **DONE**
  Task: Integrate the form with MongoDB to save applications. **DONE**
- Shelter and Adopter Notifications for Adoption Applications
  Task: Implement logic to notify shelters when a new adoption application is submitted (email or in-app notification). **DONE**
  Task: Implement logic to notify adopters of replies and display their adoption requests with status. **DONE**
- API Integrations (Google Maps, Educational APIs)
  Task: Integrate Google Maps API for animal location display or an educational APIs for breed info and animal news. Display API data in relevant parts of the app (e.g., on the animal profile or shelter page). **DONE (By Roger)**

**Additional Coordination & Shared Tasks:**
Mobile Responsiveness:
Task: All developers should ensure their components and pages are mobile-responsive using Tailwind. **DONE Partially**
Testing & Debugging:
Task: Share testing and debugging tasks to ensure all features work well together. **Pending**
LoveList:
Task: Populating an Adopter list with selected animals. **DONE**

**Business Case:**
The app will be totally free for shelters, rescuers and adopting parents. Revenue will be obtained through advertising. Google AdMob or Meta Audience Network spots will be placed in the UI of the app. **Pending**


---

**Pending IMprovements and Expansion**

- Uploading several animal pics and Image Array handling (only one pic is being uploaded).
- Encapsulate several functionalities into separate components.
- Implementing Lazy loading and Suspense for asynchronous operations.
- Optimize repetitive uneeded api calls.
- Remove all the debugging logs.
- Implementing google maps api for adopter location.
- Implementing a scheduling tool to visit animals at shelters.

---