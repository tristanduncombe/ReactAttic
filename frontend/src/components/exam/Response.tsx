import React, { ReactElement, FC, useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Avatar, Box, Card, CardContent, CardHeader, Grid, IconButton, Paper, TextField, Tooltip, Typography } from "@mui/material";
import axios from 'axios';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import ReportIcon from "@mui/icons-material/Report";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActionButtons from "./ActionButtons";

interface Props {
    id: number;
    user: { user: number, nickname: string, image: string, name: string };
    response: { user: [{ user: number, nickname: string, image: string, name: string }], assessmentResponse: number, response: string };
    answer: { user: number, assessmentResponse: number, response: string };
}

const Response = ({ id, user, response, answer }: Props) => {
    {response.user.find((user: any) => user.user === answer.user)
    return (
        <Card sx={{ width: "100%", mt: 1 }} elevation={0}>
            <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", mt: 1 }}>
                    <Tooltip title={user.nickname}>
                        <Link to={`/user/${user.name}`}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1 }} src={user?.image} />
                        </Link>
                    </Tooltip>
                    <Typography variant="body2">{user?.nickname}</Typography>
                </Box>
                <Typography sx={{ pt: 2 }}>
                    {answer.response}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", mt: 1 }}>
                    <ActionButtons user={response.user.find((user: any) => user.user === answer.user)} id={answer.assessmentResponse} />
                </Box>

            </CardContent>
        </Card>
    );
}};

export default Response;