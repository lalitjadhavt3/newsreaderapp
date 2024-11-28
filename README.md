# News Reader Application

This is a React Native News Reader Application that fetches and displays news articles from an API. It supports features like bookmarking articles, offline mode for cached news, and category-based browsing.

---

## Features:
- Fetch and display latest news.
- Bookmark articles for offline reading.
- Offline mode with cached news support.
- Categories for organized browsing.
- Seamless transitions with navigation and offline banners.

---

## Table of Contents:
1. [Setup Instructions](#setup-instructions)
2. [API Configuration Steps](#api-configuration-steps)
3. [Key Implementation Notes](#key-implementation-notes)
4. [Screenshots](#screenshots) (Optional)
5. [License](#license)

---

## Setup Instructions

### Prerequisites:
1. Node.js (>= 16.x) and npm/yarn installed.
2. React Native development environment set up. Follow the React Native Getting Started Guide (https://reactnative.dev/docs/environment-setup).
3. Android Studio and/or Xcode (for iOS development).

### Installation:
1. Clone the repository:
   ```bash
   git clone https://github.com/lalitjadhavt3/newsreaderapp.git -- cloning repo
   cd newsreaderapp --go to app folder
   npm i --install dependencies


After successfull installation
```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


## Folder Structure
```
src/
├── components/          # Reusable components
├── context/             # Offline context
├── navigations/         # Navigation configuration
├── screens/             # Individual screens
├── services/            # API integration and helpers
├── utils/               # Utility functions
└── types/               # TypeScript type definitions

```
### API Configuration Steps
Obtain an API key:
This app uses a mediastack API. Register and obtain your API key from (https://mediastack.com/) or the respective provider.




Use constants in your API utility:

``` import { API_BASE_URL, API_KEY } from 'constant/constants'; ```


## Key Implementation Notes

Navigation:
- Utilizes react-navigation with:
  - Bottom Tab Navigation for main sections (Home, Categories, Bookmark).
  - Stack Navigation for screen-specific flows like category news and detailed news views.

Offline Support:
- Integrated @react-native-community/netinfo to detect network status.
- Cached news stored using AsyncStorage for offline reading.
- Displays banners for offline states.

Bookmarking:
- Bookmarked news stored in AsyncStorage.
- Bookmark button toggles state and updates the local storage.

State Management:
- Context API used for managing the global offline state.
- Local component states handle individual screen interactions.

Performance Enhancements:
- Efficient image loading with react-native-fast-image.
- Lazy loading of components and screens.
