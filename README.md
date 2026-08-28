Markdown
# Web Arcade

A fast, lightweight, and modern browser-based arcade featuring open-source adaptations, multi-game launchers, custom-coded original games, and a built-in **Tab Cloak** tool. Built with vanilla web technologies and integrated with Firebase for cloud-based user authentication, global announcements, and admin controls.

## Features

- **Native Game Shell:** Runs open-source games and custom creations directly in the browser without clunky embeds.
- **Tab Cloak System:** Built-in menu allowing users to instantly disguise the browser tab title and favicon using popular presets (Google Classroom, Docs, Drive, Gmail) or custom inputs.
- **Cloud Authentication & User Management:** Secure sign-up, sign-in, session tracking, and account ban management backed by Firestore.
- **Global Announcements:** Dynamic announcement banner system controlled instantly via the admin panel.
- **Admin Control Panel:** Dedicated dashboard (`admin.html`) restricted to administrators to broadcast banners and manage registered user accounts.
- **Responsive & Sleek UI:** Styled with Google Fonts (`Space Grotesk` and `Inter`) and a modern dark aesthetic.

## Project Structure

```text
├── index.html        # Main arcade hub, login overlay, tab cloak, and game loader
├── admin.html        # Administrator control panel for announcements & user bans
├── css/              # Stylesheets for the shell, layout, and components
└── js/               # Modular JavaScript scripts for game loading and shared utilities
Setup & Hosting
1. Repository Setup
Clone or download this repository to your local machine, or open it directly in your code editor.

2. Configure Firebase Cloud Database
Go to the Firebase Console and create or open your project.

Under Firestore Database, create a database and set your security rules to allow read/write access:

JavaScript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
Copy your project's firebaseConfig object and ensure it is correctly inserted into the script initialization blocks in both index.html and admin.html.

3. Hosting Locally or Live
Local Testing: Run the project using a local development server (such as the Live Server extension in VS Code) to test Firestore cloud syncing and authentication.

Static Deployment: Host your files on any static hosting provider such as GitHub Pages, Vercel, or Netlify by pointing your production deployment directly to the root directory of the repository.