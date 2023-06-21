import React, { ReactElement, FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardHeader, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from 'axios';
import Message from "../components/exam/Message"

interface CourseParams extends Record<string, string> {
  id: string;
}

const Courses: FC<any> = (): ReactElement => {
  const { id } = useParams<CourseParams>();
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("//localhost:9000/course/" + id)
      .then((response) => {
        setResponse(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  });

  const assessmentid = [{ assessmentid: "1", type: "exam", year: 2022, semester: 1 }, { assessmentid: "2", type: "exam", year: 2021, semester: 1 }]


  function generateCards() {

  }

  // Use the `id` parameter in your API calls or other logic

  if (response?.course_id && response?.course_name && response?.course_title) {

    return (
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#c2c2c2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ minWidth: "60%", px: 3, py: 3 }}>
          <Typography variant="h4">
          </Typography>
          <Typography variant="h6">
          </Typography>
          <Grid container spacing={2} sx={{ mt: 3 }}>
            <Grid item xs={6}>
                <Typography component="div" variant="h5">
                  {response.course_name} - {response.course_title}
                </Typography>
                <Typography>
                  {response.course_description}
                </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }

  else {

    return (
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "#c2c2c2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper sx={{ minWidth: "60%", px: 3, pb: 3 }}>
          <Typography variant="h4">
            something went wrong
          </Typography>
        </Paper>
      </Box>
    );
  }
};

export default Courses;