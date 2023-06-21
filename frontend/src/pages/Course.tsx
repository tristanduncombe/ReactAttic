import React, { ReactElement, FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, CardHeader, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from 'axios';
import Message from "../components/exam/Message"

interface CourseParams extends Record<string, string> {
  id: string;
}

const Courses: FC<any> = (): ReactElement => {
  const { id } = useParams<CourseParams>();
  const [response, setResponse] = useState<any>(null);
  const [assessmentItem, setAssessmentItems] = useState<any>([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState<number>(null);

  useEffect(() => {
    let isMounted = true;
    axios.get(`//localhost:9000/course/id/${id}`).then(response => {
      setCourseId(response.data.course_id);
    });
    return () => {
      isMounted = false;
    };
  }, [id]);
  
  useEffect(() => {
    let isMounted = true;
    if (courseId !== null) {
      Promise.all([
        axios.get(`//localhost:9000/course/${courseId}`),
        axios.get(`//localhost:9000/course/${courseId}/assessments`)
      ]).then(([courseResponse, assessmentResponse]) => {
        if (isMounted) {
          setResponse(courseResponse.data);
          setAssessmentItems(assessmentResponse.data);
        }
      }).catch((error) => {
        setError(error);
      });
    }
    return () => {
      isMounted = false;
    };
  }, [courseId]);
  
  console.log(assessmentItem, response, (response?.course_id === true), id, courseId)

  function generateAssessmentCards() {
    if (!assessmentItem) return (<div></div>);
    return assessmentItem.map((item: { course_id: number, assessment_id: number, assessment_type: number, assessment_title: string, assessment_description: string }) => {
      return (
        <Grid item xs={12} key={item.course_id}>
          <Card
            elevation={3}
            sx={{ py: 2, px: 2, cursor: "pointer" }}
            onClick={() => navigate(`/Courses/${id}/${item.assessment_id}`)}
            id={`card-${item.assessment_id}`}
          >
            <Typography component="div" variant="h5">
              {item.assessment_title}
            </Typography>
            <Typography>
              {item.assessment_description}
            </Typography>

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
              {response?.course_name} - {response?.course_title}
            </Typography>
            <Typography>
              {response?.course_description}
            </Typography>

            {generateAssessmentCards()}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Courses;