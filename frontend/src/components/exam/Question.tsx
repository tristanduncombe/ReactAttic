import React, { ReactElement, FC, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";
import CollapsableCard from "../generic/CollapsableCard";
import Message from "./Message";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

interface Props {
    id: number;
    question: string;
    nickname: string;
    name: string;
    image: string;
    response: any;
}

const Response = ({ id, question, nickname, name, image, response }: Props) => {

    return (
        <React.Fragment>
            <Typography variant="h6" component="h2">
                {id})
            </Typography>
            <Typography>
                {question}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", mt: 1 }}>
                <Typography variant="caption">Posted by: </Typography>
                <Tooltip title={nickname}>
                    <Link to={`/user/${name}`}>
                        <Avatar sx={{ width: 32, height: 32, mr: 1 }} src={image} />
                    </Link>
                </Tooltip>
                <Typography variant="body2">{nickname}</Typography>
                <Tooltip title="Report">
                    <ReportIcon sx={{ fontSize: "medium" }} />
                </Tooltip>
            </Box>
            {/* {response?.questions?.map((question: any, index: number) => {
                const questionResponses = response?.answers?.filter((a: any) => a.assessmentQuestion === question.questionIdentifier).map((a: any) => a.response);
                console.log(questionResponses, response)
                return (
                    <Paper key={question.questionIdentifier} sx={{ mt: 1, maxWidth: "lg", width: "100%", px: 3, py: 3 }}>

                        {questionResponses && (
                            <CollapsableCard title={<React.Fragment>
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}><Typography variant="h6"><QuestionAnswerIcon sx={{ mr: 1 }} /> Discussion ({response.answers.filter((a: any) => a.assessmentResponse === answer.assessmentResponse).length})</Typography></Box></React.Fragment>} content={[
                                    ...response.answers.filter((a: any) => a.assessmentResponse === answer.assessmentResponse).map((answer: any) => {
                                        const user = response.user.find((u: any) => u.user === answer.user);
                                        return (
                                            <Message
                                                key={answer.assessmentResponse}
                                                content={answer.response}
                                                nickname={user?.nickname}
                                                username={user?.name}
                                                id={answer.assessmentResponse}
                                                user={user}
                                                imageUrl={user?.image}
                                            />
                                        );
                                    })
                                ]} defaultState={true} />
                        )}
                    </Paper>

                );
            })} */}


        </React.Fragment>
    );
};

export default Response;