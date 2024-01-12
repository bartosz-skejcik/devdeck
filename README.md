# DevDeck - New Tab Extension For Developers

## Description

This project is a new tab extension that enhances the functionality of your browser's new tab page. It allows you to customize the appearance and add useful features to make your browsing experience more productive.

## Features

| Feature                 | Description                                                                               |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| Spotify Integration     | Connect your Spotify account to control your music directly from the new tab page.        |
| Shortcuts               | Add shortcuts to your favorite websites.                                                  |
| Atlassian Integration   | View and manage your Atlassian issues and projects.                                       |
| News Articles           | Stay updated with the latest dev news.                                                    |
| Search                  | Quickly search the web with the integrated search bar.                                    |
| Weather                 | View the current weather and forecast for your location.                                  |
| Customizable Appearance | Customize the appearance of your new tab page with different wallpapers and blur effects. |

## Project Structure

This project follows a specific structure to organize the codebase:

-   `components/`: This directory contains all the React components used in the project. Each sub-directory represents a specific feature or part of the application (e.g., `articles/`, `atlassian/`, `spotify/`, etc.).
-   `hooks/`: This directory contains all the custom React hooks. These hooks encapsulate the logic related to fetching and managing data.
-   `lib/`: This directory contains utility functions and libraries used across the project.
-   `stores/`: This directory contains the state management logic using Zustand.
-   `types/`: This directory contains TypeScript type definitions.
-   `public/`: This directory contains static files like images.
-   `pages/`: This directory contains the entry point of the application.
-   `extension/`: This directory contains files related to the browser extension part of the project, like the manifest file and the HTML files for the extension.

Please note that this structure is not rigid and can be modified as the project evolves.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org) installed on your machine.
-   [pnpm](https://pnpm.io) installed on your machine.

### Usage

1. Load the extension in your browser:

    - Open your browser and go to the extensions page.
    - Enable the developer mode.
    - Click on "Load unpacked" and select the `dist` directory in the project.

2. Enjoy the enhanced new tab experience!

## Contributing

We welcome contributions from the community. If you'd like to contribute, here are some guidelines to help you get started:

### Getting Started

1. Pick an issue from the [issue tracker](https://github.com/users/bartosz-skejcik/projects/1) and assign it to yourself.

2. Fork the repository.

    - Click the "Fork" button in the top-right corner of the repository page.
    - Select your GitHub account to fork the repository to your account.

3. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/bartosz-skejcik/devdeck.git
    ```

4. Navigate to the project directory:

    ```bash
    cd devdeck
    ```

5. Install the dependencies:

    ```bash
    pnpm install
    ```

6. Create a new branch for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```

    or

    ```bash
    git checkout -b bugfix/your-bugfix-name
    ```

7. Move the `.env.example` file to `.env` and fill in the required environment variables.

8. Change the state of the issue in the [issue tracker](https://github.com/users/bartosz-skejcik/projects/1) to "In Progress". This lets other contributors know that you're working on the issue.

9. Start the development server:

    ```bash
    pnpm run dev
    ```

### Backend Proxy

This project requires a backend proxy to function correctly. The backend proxy is responsible for handling API requests and providing additional functionality.

The repository for the backend proxy is [devdeck-proxy](https://github.com/bartosz-skejcik/devdeck-proxy). To use the application, you need to have the backend proxy running alongside the frontend application.

To get started with the backend proxy, follow the instructions in its [`README.md`](https://github.com/bartosz-skejcik/devdeck-proxy/blob/main/README.md).

### Branch Naming Convention

Follow this specific branch naming convention to keep things organized:

-   For features: `feature/your-feature-name`
-   For bug fixes: `bugfix/your-bugfix-name`

### Commit Naming Convention

When making commits to the repository, please follow this naming convention to provide clear and descriptive commit messages:

-   For features: `feat: Add new feature`
-   For bug fixes: `fix: Fix bug in feature`
-   For documentation: `docs: Update README`
-   For refactoring: `refactor: Refactor code`

Commit messages should be concise yet descriptive. They should give other contributors a clear understanding of what changes have been made. Avoid vague commit messages like "fix bug" or "update code". Instead, provide a brief description of the change, like "fix: Resolve issue with login button" or "feat: Add search functionality to navbar".

Following this convention helps maintain a clean commit history and makes it easier to understand the changes made in each commit.

### Issue/PR Naming Convention

When creating a new issue or pull request, please use the following naming convention:

-   For features: `Feature: Your Feature Name`
-   For bug fixes: `Bugfix: Your Bugfix Name`

### Submitting Your Changes

Once you're ready to submit your changes, push your branch to your forked repository and create a pull request from your forked repository to the original repository. Please ensure your code adheres to the existing coding conventions and test coverage.

I appreciate your contributions and look forward to seeing your pull requests!
