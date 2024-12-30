# CoviTrack - Corona Tracker 💉🌍

This app provides up-to-date information about COVID-19 statistics in various countries. Users can view the number of cases, recoveries, and deaths globally and for specific countries. The app also includes a simple user authentication system, allowing users to register and log in to track their progress and view statistics.

## Table of Contents 📚
## Table of Contents 📚
- [Project Description](#project-description-📝)
- [Features](#features-🚀)
- [Technologies Used](#technologies-used-🛠️)
- [Installation](#installation-⚙️)
- [Usage](#usage-🔧)
- [Contributing](#contributing-🤝)


## Project Description 📝

The **CoviTrack App** provides users with a user-friendly interface to track the latest COVID-19 statistics across various countries. The app fetches data from a publicly available API to display critical health data such as confirmed cases, recoveries, and deaths for each country.

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
- Displa[]()ys country-specific details, including confirmed cases, deaths, and recoveries.
- Information is displayed in a card view format with status tags, titles, and descriptions.

### Floating Button 🦸
- A floating button at the bottom of the screen shows the count of user clicks on items in the list.
- State management is implemented using **Context API** or another simple state management library like **Zustand** or **Redux**.

### Navigation 🧭
- Simple navigation using `react-navigation` or `expo-router`.
- After successful login, users are directed to the home page where their username is displayed in the top bar.

## Technologies Used 🛠️
 
## Installation ⚙️

**React Native: For building the cross-platform app.**
**TypeScript: For strong typing and code maintainability.**
**REST APIs: For fetching real-time COVID-19 data.**
**Context API: For state management.**
**React Navigation: For seamless app navigation.**
**Chart Libraries: For data visualization.**

Follow these steps to run the app locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Rajith-Singh/covid19_mobile_app.git

## Usage 🔧

**Register/Login: Sign up or log in to access personalized features.**
**Track Data: Explore real-time statistics for any country or globally.**
**Visualize Trends: View analytics and trends through charts.**

## Contributing 🤝

**Contributions are welcome! Please follow these steps:**

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.
