# Recipe Finder Application

This README provides essential information for setting up and running the Recipe Finder Application, which was built using Create React App.

## Features
- Search recipes by name with autocomplete suggestions.
- Trending recipes, Editor's Picks, and Protein-Packed categories.
- Fetch and display recipe details, including nutrition information.
- Explore similar recipes and filter based on preferences.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js

- npm (comes with Node.js)

### Installation

#### Clone the repository:

- git clone <repository-url>

Navigate to the project directory:

- cd recipe-finder

Install dependencies:

- npm install

#### Available Scripts

- npm start

Runs the app in development mode.

Open http://localhost:3000 to view it in your browser.

The page reloads automatically when you make changes.

- npm test

Launches the test runner in interactive watch mode.

- npm run build

Builds the app for production into the build folder.

Optimizes the build for performance and readiness for deployment.

- npm run eject

Copies all configuration files and dependencies into your project, allowing customization.
Note: This is irreversible.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### API Utilization

- Autocomplete Suggestions: Fetches top 4 recipe suggestions based on input.

- Search Recipes: Retrieves recipes matching the query (up to 20 results).

- Recipe Details: Provides detailed information about a selected recipe.

- Nutrition Information: Displays the nutritional breakdown of a recipe.

- Category-Based Recipes: Fetches recipes sorted by popularity, healthiness, or protein content.

- Similar Recipes: Recommends similar recipes with batch processing for details.

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
