# Arcade

A fast, lightweight, modern browser arcade featuring open-source games, custom coded games, game launchers, cloud accounts, global announcements, administrator controls, and a built-in Tab Cloak system.

Built with vanilla HTML, CSS, and JavaScript with Firebase used for cloud based user management and synchronization.

## Features

### 🎮 Native Games

Games run directly inside the Arcade interface instead of being mirrored through external iframes.

The arcade includes:

**Open Source Games**

* 2048
* Hextris
* Space Invaders

**Game Launchers**

* Playtropolis
* The Pizza Edition

**Coded Originals**

* Snake
* Brick Burst
* Flappy Bird
* Tetris
* Pong
* Tic Tac Toe
* Memory Match
* Duel Lite
* Lucky Lights
* Night Watch
* JagDev Runner

### 🔐 Cloud Accounts

Arcade supports cloud based user accounts through Firebase.

Users can:

* Create an account
* Sign in
* Sign out
* Maintain their session across pages
* Have their account status managed by administrators

User information is stored in the Firebase Firestore database.

### 📢 Global Announcements

Administrators can publish announcements that appear across the Arcade.

Announcements are synchronized through Firebase so they can be displayed on different devices.

### ⚙️ Admin Panel

The project includes a dedicated `admin.html` dashboard.

Administrators can:

* View registered users
* Create accounts
* Change user passwords
* Ban users
* Unban users
* Grant administrator access
* Remove administrator access
* Publish announcements
* Clear announcements

The main administrator can also control which other users receive administrator privileges.

### 🕵️ Tab Cloak

Arcade includes a built in Tab Cloak menu.

Users can change the browser tab appearance using preset options such as:

* Google Classroom
* Google Docs
* Google Drive
* Gmail

Custom tab titles and favicons can also be supported depending on the current implementation.

### 🎨 Modern Interface

The Arcade uses a dark, modern interface with:

* Responsive layouts
* Game cards
* Animated interactions
* Space Grotesk
* Inter
* Native game screens
* Mobile friendly controls

## Project Structure

```text
Web-Arcade/
│
├── index.html
├── admin.html
├── README.md
├── LICENSE
│
├── css/
│   ├── main.css
│   └── game-shell.css
│
└── js/
    ├── main.js
    ├── gameLoader.js
    │
    └── shared/
        ├── input.js
        └── storage.js
```

### Main Files

`index.html`

The main Arcade homepage. Handles the login interface, game hub, announcement display, Tab Cloak interface, and game shell.

`admin.html`

The administrator dashboard used to manage users, administrators, bans, passwords, and announcements.

`js/main.js`

Controls the game catalog, homepage navigation, game selection, and routing.

`js/gameLoader.js`

Loads games into the Arcade game shell and handles starting and destroying games.

`js/shared/input.js`

Provides shared keyboard and touch input functionality.

`js/shared/storage.js`

Handles local browser storage used by games and other client side features.

`css/main.css`

Contains the primary Arcade interface styling.

`css/game-shell.css`

Contains styling for the game playing interface.

## Firebase Setup

Arcade uses Firebase Firestore for cloud based user management and synchronization.

### 1. Create a Firebase Project

Go to the Firebase Console and create a Firebase project.

### 2. Create Firestore

Open:

**Firebase Console → Firestore Database**

Create a Firestore database for the project.

### 3. Configure Firebase

Add your Firebase configuration to the Firebase initialization sections of:

```text
index.html
admin.html
```

The configuration normally looks similar to:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Use the configuration provided by your own Firebase project.

### 4. Firestore Data

The Arcade uses Firestore to synchronize information such as registered users and account status.

User documents are stored in the Arcade user collection.

```text
arcade_users
```

User records can contain information such as:

```text
username
password
isBanned
isAdmin
```

The exact fields depend on the current implementation.

## Local Testing

You can run Arcade locally using a static development server.

For example, with VS Code, install the **Live Server** extension and open:

```text
index.html
```

Then launch the project using Live Server.

Using a local server is recommended when testing Firebase functionality.

## Hosting

Arcade is a static web project and can be hosted on services such as:

* GitHub Pages
* Vercel
* Netlify
* Other static web hosting services

The production deployment should point to the root of the repository.

No traditional backend server is required for the Arcade frontend.

## GitHub Setup

Clone the repository:

```bash
git clone https://github.com/naahs-lawragga/arcade.git
cd arcade
```

Install or configure Firebase as described above, then open the project in your preferred editor.

## Updating the Project

After making changes, run:

```bash
git add .
git commit -m "Update Arcade"
git push origin main
```

Your hosting provider can then deploy the updated repository automatically if continuous deployment is enabled.

## Important Security Note

Firebase configuration values used by frontend applications are not automatically secret simply because they appear in the source code.

However, Firestore security rules and server side authorization are extremely important.

Do not rely on hidden buttons, hidden URLs, localStorage, or JavaScript checks as the only protection for administrative functionality.

For a production deployment, configure Firebase Authentication and Firestore Security Rules so users cannot directly modify administrator or ban information from their browser.

## License

Copyright © 2026 Naahs Lawragga.

This project is released under the MIT License.

See the `LICENSE` file for the complete license terms.

You may use, modify, copy, and distribute the project according to the MIT License.
