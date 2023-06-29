import React, { ReactElement, FC, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";
import axios from 'axios';
import Message from "../components/exam/Message";
import ReportIcon from "@mui/icons-material/Report";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import CollapsableCard from "../components/generic/CollapsableCard";



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
          const answer = response?.answers?.find((a: any) => a.assessmentQuestion === question.questionIdentifier);
          console.log(answer, response)
          return (
            <Paper key={question.questionIdentifier} sx={{ mt: 1, maxWidth: "lg", width: "100%", px: 3, py: 3 }}>
              <Typography variant="h6" component="h2">
                {question.questionNumber})
              </Typography>
              <Typography>
                {question.question}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mt: 1 }}>
                <Typography variant="caption">Posted by: </Typography>
                <Tooltip title={response.user.find((user: any) => user.user === question.user)?.nickname}>
                  <Link to={`/user/${response.user.find((user: any) => user.user === question.user)?.name}`}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }} src={response.user.find((user: any) => user.user === question.user)?.image} />
                  </Link>
                </Tooltip>
                <Typography variant="body2">{response.user.find((user: any) => user.user === question.user)?.nickname}</Typography>
                <Tooltip title="Report">
                  <ReportIcon sx={{ fontSize: "medium" }} />
                </Tooltip>
              </Box>
              {answer && (
                <CollapsableCard title={<React.Fragment>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}><Typography variant="h6"><QuestionAnswerIcon sx={{mr: 1}}/> Discussion ({response.answers.filter((a: any) => a.assessmentResponse === answer.assessmentResponse).length})</Typography></Box></React.Fragment>} content={[
                    ...response.answers.filter((a: any) => a.assessmentResponse === answer.assessmentResponse).map((answer: any) => {
                      const user = response.user.find((u: any) => u.user === answer.user);
                      return (
                        <Message
                          key={answer.id}
                          content={answer.response}
                          nickname={user?.nickname}
                          username={user?.name}
                          id={answer.id}
                          user={user}
                          imageUrl={user?.image}
                        />
                      );
                    })
                  ]} defaultState={true} />
              )}
            </Paper>

          );
        })}
      </Box>
    </Box>
  );
};

export default Courses;