# Arsh Keeps: A Google Keep Clone

A modern, responsive note-taking web application inspired by Google Keep, built with React and powered by Google Firebase.

## Table of Contents

- [Core Features](#core-features)
- [How It Works: A Technical Overview](#how-it-works-a-technical-overview)
- [Technology Stack](#technology-stack)
- [Folder Structure](#folder-structure)
- [Local Setup and Installation](#local-setup-and-installation)

## Core Features

This application includes a robust set of features designed for a seamless and intuitive user experience.

#### 1. Real-time Note Management
- **Create Notes**: A simple and elegant form allows users to create notes with a title, content, and labels.
- **Archive & Trash**: Notes can be archived to be hidden from the main view or moved to the trash. Trashed notes can be restored or permanently deleted.
- **Drag-and-Drop**: Notes on the main page can be reordered using a smooth drag-and-drop interface powered by `react-beautiful-dnd`.

#### 2. Dynamic Labeling System
- **Create & Assign Labels**: Users can create new labels on the fly, either from the main navigation or directly when creating/editing a note.
- **Filter by Label**: Clicking a label in the navigation drawer filters the notes view to show only notes associated with that label.
- **Edit Note Labels**: Each note card has a label menu, allowing users to add or remove labels from that specific note with a checkbox interface.
- **Global Label Management**: An "Edit Labels" dialog allows for globally renaming or deleting existing labels. These changes are reflected across all notes that use them.

#### 3. User Authentication
- **Google Sign-In**: Users can authenticate with their Google account. The application forces account selection on every sign-in attempt, allowing for easy user switching.
- **Protected Content**: The main application is protected. Unauthenticated users are presented with a clean login page and cannot view or interact with any notes until they sign in.
- **Shared Data Model**: In its current implementation, the application uses a basic authentication flow where all authenticated users share and collaborate on the same set of notes. 

#### 4. Global Search
- **Live Search**: A search bar in the header allows users to search all notes (including archived and trashed items) in real-time.
- **Regex-Powered**: The search is case-insensitive and uses regular expressions, allowing for flexible and powerful text matching against a note's title and content.

#### 5. Modern UI/UX
- **Responsive Design**: The application is fully responsive, with a collapsible navigation drawer for seamless use on all screen sizes.
- **Global Notifications**: A "Snackbar" notification system provides non-intrusive feedback for actions like saving a note or validation errors (e.g., requiring a title).

---

## How It Works: A Technical Overview

The application is built around a centralized state management model powered by React Context and a real-time backend provided by Google Firestore.

#### State Management: `DataProvider.jsx`
- The `src/context/DataProvider.jsx` file is the heart of the application. It acts as a global state container for almost all application data, including the notes, labels, user authentication status, and search query.
- It provides both the data and the functions to manipulate that data (e.g., `addNote`, `deleteLabel`, `updateNoteLabels`) to any component that needs them, avoiding the need to pass props down through many levels.

#### Database: Google Firestore
- All data (notes, labels) is stored in a Firestore database.
- The `DataProvider` uses Firestore's `onSnapshot` listener to subscribe to real-time updates from the database. When data is changed in Firestore (by any user), the app's UI updates automatically without needing a page refresh.
- All data manipulation functions (`addNote`, `archiveNote`, etc.) directly call the Firebase SDK to modify data in the database, which then triggers the real-time updates.

#### Authentication Flow: `App.js`
- The root `App.js` component acts as a gatekeeper.
- It consumes the `user` object from the `DataProvider`.
- If the `user` object exists, it renders the main `<Home />` component.
- If the `user` object is `null`, it renders the `<LoginPage />` component, effectively protecting all application content from unauthenticated users.

---

## Technology Stack

- **Frontend**: React.js
- **Backend & Database**: Google Firebase (Firestore, Authentication)
- **UI Components**: Material-UI (MUI)
- **Styling**: Styled Components (`@mui/material/styles`)
- **Drag & Drop**: `react-beautiful-dnd`

---

## Folder Structure

```
/
├── public/              # Public assets and index.html
├── src/
│   ├── Assets/          # Images and other static assets
│   ├── components/      # Reusable React components
│   │   ├── archives/
│   │   ├── delete/
│   │   ├── labels/
│   │   └── notes/
│   ├── context/         # React context for global state
│   ├── utils/           # Utility functions
│   ├── App.js           # Main application component
│   ├── firebase.js      # Firebase configuration
│   └── index.js         # Entry point of the application
├── .gitignore
├── package.json
└── README.md
```

---

## Local Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase:**
    - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
    - Create a **Firestore Database** and start it in **Test Mode**.
    - Go to the **Authentication** section and enable the **Google** sign-in provider.
    - In your Project Settings, register a new Web App (`</>`) and copy the `firebaseConfig` object.
    - Paste this `firebaseConfig` object into the `src/firebase.js` file.

4.  **Start the application:**
    ```bash
    npm start
    ```

This will run the app in development mode. Open the project on the localhost in your browser.
