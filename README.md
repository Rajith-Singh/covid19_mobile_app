# Healthcare App - Corona Tracker 💉🌍

This app provides up-to-date information about COVID-19 statistics in various countries. Users can view the number of cases, recoveries, and deaths globally and for specific countries. The app also includes a simple user authentication system, allowing users to register and log in to track their progress and view statistics.

## Table of Contents 📚
- [Project Description](#project-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [User Authentication](#user-authentication)
- [Navigation](#navigation)
- [Contributing](#contributing)
- [License](#license)

## Project Description 📝

The **Corona Tracker App** provides users with a user-friendly interface to track the latest COVID-19 statistics across various countries. The app fetches data from a publicly available API to display critical health data such as confirmed cases, recoveries, and deaths for each country.

### Features:
- View real-time COVID-19 statistics for any country 🌐.
- User authentication system with registration and login forms 🔑.
- Display information in a card view with status tags, title, and description 🏷️.
- Floating button to track the number of times a user clicks on an item in the list 🖱️.
- Context API (or another state management library) to manage the click count state 📊.

## Features 🚀

### User Authentication 🔒
- **Registration**: Allows users to sign up with a username and password.
- **Login**: Users can log in with their credentials to access the home page.
- Form validations are implemented for both registration and login forms using hooks.

### Corona Statistics 📊
- Fetches COVID-19 data from a public API (e.g., `https://api.covid19api.com/`).
- Displays country-specific details, including confirmed cases, deaths, and recoveries.
- Information is displayed in a card view format with status tags, titles, and descriptions.

### Floating Button 🦸
- A floating button at the bottom of the screen shows the count of user clicks on items in the list.
- State management is implemented using **Context API** or another simple state management library like **Zustand** or **Redux**.

### Navigation 🧭
- Simple navigation using `react-navigation` or `expo-router`.
- After successful login, users are directed to the home page where their username is displayed in the top bar.

## Installation ⚙️

Follow these steps to run the app locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Rajith-Singh/covid19_mobile_app.git
