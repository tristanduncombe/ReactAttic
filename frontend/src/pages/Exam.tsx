import React, { ReactElement, FC, useState, useEffect } from "react";
import { Box, Card, CardHeader, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from 'axios';
import Message from "../components/exam/Message"
import { useNavigate } from "react-router-dom";

const Courses: FC<any> = (): ReactElement => {
  const [courses, setCourses] = useState([{name: "CSSE3012", title: "The Software Process", description: "bad course"}]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  function generateCourseCards() {
    return courses.map((course: any) => {
      let elevation = 3;
  
      return (
        <Grid item xs={6} key={course.id}>
          <Card
            elevation={elevation}
            sx={{ py: 2, px: 2, cursor: "pointer" }}
            onClick={() => navigate(`/Courses/${course.name}`)}
            onMouseOver={() => {
              elevation = 6;
              document.getElementById(`card-${course.id}`)?.setAttribute("elevation", "6");
            }}
            onMouseOut={() => {
              elevation = 3;
              document.getElementById(`card-${course.id}`)?.setAttribute("elevation", "3");
            }}
            id={`card-${course.id}`}
          >
            <Typography component="div" variant="h5">
              {course.name}
            </Typography>
            {course.description}
          </Card>
        </Grid>
      )
    });
  }
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#c2c2c2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "md"
      }}
    >
      <Paper sx={{maxWidth: "lg", width: "100%", px: 3, py: 3}}>
        <Typography variant="h4">
          Course Lookup
        </Typography>
        <Typography variant="h6">
          I'm looking for answers for a past exam or assignment
        </Typography>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" sx={{ marginTop: 2 }} />
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            {generateCourseCards()}
          </Grid>
        </Grid>
        <Message title={"test"} type={1} content={"test test test"} author={"test author"} imageUrl={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}></Message>
      </Paper>
    </Box>
  );
};

export default Courses;