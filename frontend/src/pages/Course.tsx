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
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   axios.get("/api/courses")
  //     .then((response) => {
  //       setCourses(response.data);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // }

  const response = [{name: "CSSE3012", title: "The Software Process", description: "bad course"}]
  const assessmentid = [{assessmentid: "1", type: "exam", year: 2022, semester: 1}, {assessmentid: "2", type: "exam", year: 2021, semester: 1}]


  // Use the `id` parameter in your API calls or other logic

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
          {response[0].name + " - " + response[0].title}
        </Typography>
        <Typography variant="h6">
          {response[0].description}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <Card elevation={3} sx={{ py: 2, px: 2 }}>
              <Typography component="div" variant="h5">
                Test
              </Typography>
              asdasd
            </Card>
          </Grid>


          <Grid item xs={6}>
            <Card elevation={3}>
              <CardHeader>
                Assignments
              </CardHeader>
              asdasd
            </Card>
          </Grid>
        </Grid>
        <Message title={"test"} type={1} content={"test test test"} author={"test author"} imageUrl={"https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png"}></Message>
      </Paper>
    </Box>
  );
};

export default Courses;