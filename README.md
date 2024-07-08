# Project Overview

This is the web repo for the trip expense calculator.
It's a react SPA setup using [vite](https://vitejs.dev/)

Some of the main external libraries used are:
- [Vite](https://vitejs.dev/): Used to setup and configure the project.
- [React Router](https://reactrouter.com/en/main): Used for routing and to make the project an SPA.
- [React Acre](https://www.npmjs.com/package/react-ace): Use to display code in the intro section.
- [Styled Components](https://styled-components.com/): Used to build the re-usable UI components in the app.
- [Vitest](https://vitest.dev/): Used for testing.
- [Vitest UI](https://vitest.dev/guide/ui): Used to visualize tests.

# Dependencies Required
- [VS Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en) >=v18.0.0
- [TripExpenseCalculator.API](TODO INSERT LINK)

# How to run
1. Clone the repo to your local machine
2. Open the project in VS Code
3. Make sure the API is running (Steps for how to do this listed in the TripExpenseCalculator.API readme.)
4. In a terminal enter the command "npm run dev" to start the app. This should open the app on port 5173. It's critical the app is running on port 5173 because that's the port the the API sets the the CORS policy for. If this won't work you can change the CORS setup in the API, and the how to for that is listed in the API readme.

That should be all you need to do to run the app, if you have any questions feel free to reach out.

# How to run tests
 1. Make sure the repo is cloned and opened in VS Code.
 2. In a terminal enter the command "npm run test".
This will run the tests and display the output in the terminal.

If you'd prefer to see a visual view of the tests you can enter the command "npm run test:ui" instead.
I personally prefer the UI since it's more front and center and I can see what tests are failing as I make changes and save the file. But that's just preference/opinion, either is totally fine.
