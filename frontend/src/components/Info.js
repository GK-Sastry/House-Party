import React, { useState, useEffect } from "react";
import { Grid, Button, Typography, IconButton } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";

// Define constant page names for JOIN and CREATE pages
const pages = {
  JOIN: "pages.join", // Identifies the 'join' page
  CREATE: "pages.create", // Identifies the 'create' page
};

export default function Info(props) {
  // State to track the current page (JOIN or CREATE)
  const [page, setPage] = useState(pages.JOIN);

  // Function to return content for the Join page
  function joinInfo() {
    return "Join page"; // Placeholder text for join page info
  }

  // Function to return content for the Create page
  function createInfo() {
    return "Create page"; // Placeholder text for create page info
  }

  // useEffect is used for side effects; here, it runs when the component is mounted
  useEffect(() => {
    console.log("Component has mounted");

    // Cleanup function that runs when the component is unmounted or dependencies change
    return () => {
      console.log("Component will unmount");
    };
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  return (
    <Grid container spacing={1}>
      {/* Title section */}
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          What is House Party?
        </Typography>
      </Grid>

      {/* Display content based on the current page (either JOIN or CREATE) */}
      <Grid item xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>

      {/* Button to toggle between the JOIN and CREATE pages */}
      <Grid item xs={12} align="center">
        <IconButton
          onClick={() => {
            // Switch the page between JOIN and CREATE
            setPage(page === pages.CREATE ? pages.JOIN : pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon /> // Show "Back" icon when on CREATE page
          ) : (
            <NavigateNextIcon /> // Show "Next" icon when on JOIN page
          )}
        </IconButton>
      </Grid>

      {/* Back button to navigate to the homepage */}
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}
