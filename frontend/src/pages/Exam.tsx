import React, { ReactElement, FC, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";
import axios from 'axios';
import Message from "../components/exam/Message";
import ReportIcon from "@mui/icons-material/Report";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CollapsableCard from "../components/generic/CollapsableCard";
import Question from "../components/exam/Question";



interface AssessmentParams extends Record<string, string> {
  id: string;
  assessmentId: string;
}



const Courses: FC<any> = (): ReactElement => {
  const { id, assessmentId } = useParams<AssessmentParams>();
  const [response, setResponse] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [error, setError] = useState(null);
  const [value, setValue] = useState(0);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  useEffect(() => {
    let isMounted = true;
    axios.get(`//localhost:9000/exam/${assessmentId}`).then(response => {
      setResponse(response.data);
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  console.log(response)

  const handleLike = () => {
    setLike(!like);
    setDislike(false);
  };

  const handleDislike = () => {
    setDislike(!dislike);
    setLike(false);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#c2c2c2",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Paper sx={{ maxWidth: "lg", width: "100%", p: 3 }}>
        <Typography component="div" variant="h5">
          {response?.assessmentItem?.assessment_title || "Assessment Title"} - {response?.assessmentItem?.assessment_semester || "Assessment Semester"}, {response?.assessmentItem?.assessment_year || "Assessment Year"}
        </Typography>
        <Typography>
          {response?.assessmentItem?.assessment_description || "Assessment Materials"}
        </Typography>
      </Paper>
      <Box sx={{ my: 1, maxWidth: "lg", width: "100%" }}>
        {response?.questions?.map((question: any, index: number) => {
          const user = response?.user.find((u) => u.user === question.user);
          return (
            <Question
              key={question.questionIdentifier}
              id={index}
              question={question.question}
              nickname={user?.nickname || ""}
              name={user?.name || ""}
              image={user?.image || ""}
              response={response}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Courses;