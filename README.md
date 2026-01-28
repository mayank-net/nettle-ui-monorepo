# nettle-ui-monorepo

# Technical Architecture and Design: nettle-ui-monorepo

## Getting Started

```
yarn install

# create a .env.development file and add following env vars

# Firebase Configuration
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_app.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_app.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_id
REACT_APP_FIREBASE_APP_ID=your_app_id

# run locally
yarn workspace auth-module-ui start
```

## 1. Overview

This document outlines the technical architecture and design of the `nettle-ui-monorepo`. This repository is a Yarn workspaces-based monorepo that houses several React applications and shared packages.

### 1.1. Core Technologies

The frontend stack is built around a modern set of technologies:

- **UI Framework:** React
- **Styling:** styled-components and styled-system
- **State Management:** Zustand for global state and React Query for server state.
- **Routing:** React Router
- **Build System:** Create React App, customized with Craco.

### 1.2. Project Structure

The monorepo is organized into a `packages` directory, which contains individual applications and shared libraries. This approach promotes code reuse and modularity.

```
nettle-ui-monorepo/
├── packages/
│   ├── auth-module-ui/
│   ├── nettle-design/
│   ├── shared/
│   └── theme/
├── package.json
└── tsconfig.json
```

## 2. Package Breakdown

In the following sections, we will explore the purpose and architecture of each package within the monorepo.

### 2.1. `shared`

The `shared` package is a crucial part of the monorepo, providing a collection of reusable modules and components that are consumed by the various applications. This promotes consistency and reduces code duplication.

The structure of the `shared` package is as follows:

```
packages/shared/
├── config/
├── global-state/
├── modules/
└── utils/
```

- **`config/`**: Holds global configuration files, such as environment variables and feature flags.
- **`global-state/`**: Manages the global application state using Zustand. This is where the state stores are defined.
- **`modules/`**: Contains larger, more complex modules that encapsulate a specific piece of functionality, such as a chat or a document viewer.
- **`utils/`**: A collection of utility functions that can be used anywhere in the codebase.

### 2.2. `nettle-design`

The `nettle-design` package is the design system for the `nettle-ui-monorepo`. It provides a set of reusable React components that are styled and themed to match the nettle brand. This package is crucial for maintaining a consistent look and feel across all of the applications in the monorepo.

The `nettle-design` package follows an **Atomic Design** methodology, which organizes components into a hierarchy of complexity. This makes the design system more modular, scalable, and easier to maintain.

The structure of the `nettle-design` package is as follows:

```
packages/nettle-design/
└── src/
    ├── components/
    │   ├── atoms/
    │   └── molecules/
    ├── props/
    ├── utils/
    └── index.ts
```

- **`components/`**: This directory contains the React components, organized by their level of complexity (atoms and molecules).
  - **`atoms/`**: The smallest, most basic building blocks of the design system, such as buttons, inputs, and labels.
  - **`molecules/`**: More complex components that are composed of multiple atoms, such as a search form or a navigation bar.
- **`props/`**: Contains common prop types and interfaces that are used by the components.
- **`utils/`**: A collection of utility functions that are specific to the design system.

### 2.3. `theme`

The `theme` package is responsible for defining the visual identity of the nettle applications. It provides a centralized place to manage colors, typography, spacing, and other design tokens. This package is used in conjunction with `styled-components` to ensure a consistent and cohesive user interface.

The structure of the `theme` package is as follows:

```
packages/theme/
├── assets/
└── src/
    ├── provider/
    ├── colors.ts
    ├── space.ts
    ├── typography.ts
    ├── types.ts
    └── index.ts
```

- **`assets/`**: Contains static assets, such as images, icons, and fonts, that are used in the applications.
- **`src/`**: This directory contains the source code for the theme.
  - **`colors.ts`**: Defines the color palette for the application.
  - **`space.ts`**: Defines the spacing scale (e.g., for margins and paddings).
  - **`typography.ts`**: Defines the typography styles, such as font sizes, font families, and font weights.
  - **`types.ts`**: Contains the TypeScript types and interfaces for the theme object.
  - **`provider/`**: This directory likely contains a ThemeProvider component that uses a React Context to provide the theme to all components in the application.
  - **`index.ts`**: The entry point for the package, which exports the theme object and any related utilities.

### 2.4. `auth-module-ui`

The `auth-module-ui` package is a standalone React application that handles user authentication. It provides the user interface for logging in, signing up, and managing user accounts. This module is likely used as the entry point for users before they can access the other nettle applications.

The `auth-module-ui` application is built with Create React App and customized with Craco. It has separate build configurations for development, staging, and production environments.

The structure of the `auth-module-ui` application is as follows:

```
packages/auth-module-ui/
├── public/
├── src/
│   ├── components/
│   ├── entry-points/
│   ├── modules/
│   ├── routes/
│   ├── utils/
│   ├── index.css
│   └── index.tsx
├── craco.config.ts
└── package.json
```

- **`src/`**: The source code for the application.
  - **`components/`**: Contains React components that are specific to the `auth-module-ui` application.
  - **`entry-points/`**: This directory may contain different entry points for the application, allowing it to be integrated in various ways.
  - **`modules/`**: Organizes the application into feature modules, such as login, registration, and password reset.
  - **`routes/`**: Defines the client-side routes for the application using React Router.
  - **`utils/`**: A collection of utility functions that are specific to the authentication module.
  - **`index.tsx`**: The main entry point for the React application.
- **`craco.config.ts`**: The configuration file for Craco, which is used to customize the Create React App build process.
