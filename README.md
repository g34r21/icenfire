# An Interface of Ice and Fire

## Overview
"An Interface of Ice and Fire" is a web application designed for fans of the epic series *A Song of Ice and Fire*. It allows users to track the status of characters in the series, specifically focusing on whether they are alive or dead. The application pulls data from the [An API of Ice and Fire](https://anapioficeandfire.com/) and organizes it to display sworn members of various houses, making it easier to navigate the complex web of allegiances and fates within the series.

## Technology Stack & Tools
- **Next.js**: For server-side rendering, static site generation, and intuitive routing with the App Router.
- **Material UI**: A comprehensive suite of components following Material Design guidelines.
- **React Query**: Simplifies data fetching and state management with built-in caching and synchronization.
- **TypeScript**: Enhances code reliability with static type checking.
- **Vitest**: A fast testing framework that integrates well with existing tools.
- **React Testing Library**: For testing React components with a focus on user interactions.
- **ESLint**: Ensures code quality through linting.
- **Lint-staged**: Runs linters on git-staged files to enforce code quality pre-commit.
- **Husky**: Manages git hooks for automated tasks like linting and testing.
- **Commitlint**: Enforces conventional commit messages to maintain a consistent commit history.
- **GitHub Actions**: Automates CI/CD pipelines for testing and deployment.
- **Vercel**: Deploys the application with seamless integration with Next.js, offering global CDN for optimal performance.

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [pnpm](https://pnpm.io/) (version 8.x or higher)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/g34r21/icenfire.git
   cd icenfire
   ```

2. **Install Dependencies**
   Use `pnpm` to install the project dependencies:
   ```bash
   pnpm install
   ```

3. **Run the Development Server**
   Start the development server with:
   ```bash
   pnpm dev
   ```
   The application should now be running on [http://localhost:3000](http://localhost:3000).

4. **Build the Project**
   To create an optimized production build, run:
   ```bash
   pnpm build
   ```

5. **Run Tests**
   To execute the test suite, use:
   ```bash
   pnpm test
   ```

## Project Structure
The project is organized as follows:

- **`/components`**: Contains reusable React components.
- **`/app`**: Holds the main application files, adhering to the App Router structure.
- **`/__tests__`**: Includes unit tests to ensure code reliability.
- **`/utils`**: Contains utility functions and helper methods.
- **`/hooks`**: Custom React hooks, including those used for data fetching with React Query.

## Why this Tech Stack?

- **Next.js**: Selected for its robust features like server-side rendering, static site generation, and API routes, all aligning perfectly with this project's needs. The App Router streamlines routing, making development more intuitive and scalable. Additionally, this is the framework I am most proficient in, which ensures high-quality and efficient development.

- **Material UI**: Offers a comprehensive suite of components that adhere to Google's Material Design guidelines. It ensures that the application is not only visually appealing but also accessible and responsive. Additionally, it is production-ready, widely adopted by companies globally, and easily customizable, making it an ideal choice for this project.

- **React Query**: This library is invaluable for managing server state, particularly in a project like this where data needs to be fetched from an external API. React Query simplifies the data-fetching process and provides built-in caching, synchronization, and error handling.

- **TypeScript**: Enhances code reliability by catching errors at compile time, which is crucial for maintaining a large and complex codebase.

- **pnpm**: Chosen for its speed and efficient disk space usage, `pnpm` outperforms other package managers, making it ideal for managing dependencies in this project.

- **Vitest**: For testing, Vitest is fast and integrates well with the existing tools and libraries, making it easier to ensure the reliability of the codebase.

- **React Testing Library**: Focuses on testing components in a way that mimics how users interact with them, ensuring the application behaves as expected.

- **ESLint**: Used for code linting, ensuring the codebase adheres to best practices and style guidelines.

- **Lint-staged**: Runs linters on staged files, ensuring only clean code is committed.

- **Husky**: Manages git hooks to automate tasks like linting and testing before commits, improving code quality.

- **Commitlint**: Enforces conventional commit messages, ensuring a consistent and descriptive commit history.

- **GitHub Actions**: Integrated for CI/CD, allowing automated testing and deployment, which ensures that the application is reliable and changes are seamlessly deployed.

- **Vercel**: Used for deploying the application. Vercel offers a smooth integration with Next.js, making the deployment process straightforward and providing a global CDN for fast performance.

## Future Enhancements
- **Character Search**: Implement a search feature to allow users to find specific characters quickly.
- **Detailed Character Profiles**: Expand the information available for each character, including their biography, allegiances, and notable events.
- **House Comparison Tool**: Add a feature to compare the sworn members of different houses side-by-side.
- **MUI Theming**: Personalize the MUI theme to adjust spacing, colors, and other design elements to give the project a unique touch.
- **Additional Test Cases**: Add more test cases to ensure comprehensive coverage and functionality.
