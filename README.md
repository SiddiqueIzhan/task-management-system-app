# Task Management System

## Overview

The Task Management System is a web application designed to help users organize their tasks efficiently. The app provides features such as user authentication, task categorization, drag-and-drop functionality, batch actions, task history, file attachments, filtering options, and a responsive design.

---

## Features

### 1. User Authentication

- Integrated Firebase Authentication with Google Sign-In.
- Allows users to manage their profiles securely.

### 2. Task Management

- Users can create, edit, and delete tasks.
- Tasks can be categorized (e.g., work, personal) and tagged for organization.
- Set due dates for tasks to keep track of deadlines.
- Drag-and-drop functionality to rearrange tasks within the list.
- Sort tasks by due dates in ascending or descending order.

### 3. Batch Actions

- Perform batch actions on tasks, such as deleting multiple tasks or marking them as complete.

### 4. Task History and Activity Log

- Tracks changes made to tasks (creation, edits, deletions).
- Displays an activity log for each task.

### 5. File Attachments

- Users can attach files or documents to tasks for additional context.
- File upload feature is available in the task creation/editing form.
- Attached files are displayed in the task detail view.

### 6. Filter Options

- Filter tasks by tags, category, and date range.
- Search tasks by title for quick access.

### 7. Board/List View

- Users can switch between a board view (Kanban-style) and a list view for tasks.

### 8. Responsive Design

- Fully responsive design, adapting to various screen sizes (mobile, tablet, desktop).
- Designed with a mobile-first approach.

---

## Technical Requirements

- **Frontend Framework**: React with TypeScript.
- **Authentication & Database**: Firebase.
- **State Management**: Context API.
- **Styling**: SCSS and TailwindCSS with a mobile-first design approach.

---

## Challenges Faced & Solutions Implemented

### 1. **Drag-and-Drop Functionality**

- **Challenge**: Implementing smooth drag-and-drop across lists while maintaining state consistency.
- **Solution**: Used `react-dnd` library for managing drag-and-drop operations efficiently.

### 2. **Batch Actions**

- **Challenge**: Ensuring accurate selection of tasks for batch actions.
- **Solution**: Used a state array to track selected tasks and ensured the UI updates synchronously with batch operations.

### 3. **File Uploads**

- **Challenge**: Handling file uploads and ensuring files are stored securely.
- **Solution**: Utilized React Hooks to store and display images.

### 4. **Responsive Design**

- **Challenge**: Adapting the app to multiple screen sizes.
- **Solution**: Designed layouts using a mobile-first approach with CSS media queries.

### 5. **Activity Log**

- **Challenge**: Efficiently tracking task changes and displaying logs.
- **Solution**: Stored logs in Realtime Database under a `logs` collection for each task and displayed them in the task detail view.

---

## Instructions to Run the Project

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Firebase project set up with Authentication and Firestore enabled

### Steps to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/SiddiqueIzhan/task-management-system-app.git
   cd task-management-system
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Firebase**:

   - Go to the Firebase Console and create a project.
   - Enable Google Authentication under the Authentication > Sign-in method tab.
   - Create a Firestore database.
   - Enable Firebase Storage for file uploads.
   - Add the `task-management-system.vercel.app` domain to the Authorized domains list under Authentication > Settings.
   - Copy the Firebase configuration from the Firebase Console and create a `.env.local` file in the project root:
     ```env
     REACT_APP_FIREBASE_API_KEY=AIzaSyAKVOtskLCNKXHsKD8LINmJH4B3F3mBi1U
     REACT_APP_FIREBASE_AUTH_DOMAIN=task-management-app1-f6b3f.firebaseapp.com
     REACT_APP_FIREBASE_PROJECT_ID=task-management-app1-f6b3f
     REACT_APP_FIREBASE_STORAGE_BUCKET=task-management-app1-f6b3f.firebasestorage.app
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=744452578604
     REACT_APP_FIREBASE_APP_ID=task-management-app1-f6b3f-default-rtdb.firebaseio.com
     ```

4. **Start the Development Server**:

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Build for Production**:

   ```bash
   npm run build
   # or
   yarn build
   ```

6. **Deploy to Vercel**:
   - Create an account on [Vercel](https://vercel.com/).
   - Link the GitHub repository to your Vercel project.
   - Vercel will automatically build and deploy the app.

---

## Conclusion

This Task Management System is a robust and scalable application designed to streamline task organization and improve productivity. Future enhancements could include push notifications, calendar integration, and real-time collaboration features.
