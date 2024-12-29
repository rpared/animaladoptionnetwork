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


**Business Case:**
The app will be totally free for shelters, rescuers and adopting parents. Revenue will be obtained through advertising. Google AdMob or Meta Audience Network spots will be placed in the UI of the app. **Pending**


---

**Pending Improvements and Expansion**
- Refactor the api/uploadAnimals/route.js into a typescript file
- Upload several animal pics and Image Array handle (only one pic is being uploaded).
- Encapsulate several functionalities into separate components.
- Implement Lazy loading, Suspense for asynchronous operations and loading of the layout skeleton .
- Optimize repetitive uneeded api calls.
- Remove all debugging logs.
- Implement google maps api for adopter location (it only works for shelters).
- Catch conditionals or falloff logic for addresses not found by google maps.
- Implement a scheduling tool to visit animals at shelters.

---