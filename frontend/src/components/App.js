import React from "react";
import { render } from "react-dom";
import HomePage from "./HomePage";

// Functional component definition for the main App component
const App = () => {
  // The render function in class components is replaced by the return statement in functional components
  return (
    // The "center" class is used for styling to center the content on the page
    <div className="center">
      {/* HomePage component is rendered inside the main App component */}
      <HomePage />
    </div>
  );
};

// Get the HTML element with the id "app" where the React app will be rendered
const appDiv = document.getElementById("app");

// Render the App component into the DOM at the "app" div
render(<App />, appDiv);
