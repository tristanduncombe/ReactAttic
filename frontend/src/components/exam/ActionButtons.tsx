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

interface Props {
    id: number;
    user: number;
}

const ActionButtons = ({id, user }: Props) => {
    const [like, setLike] = useState(false);
    const [dislike, setDislike] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        // Fetch the initial number of likes for the post
        axios.get(`http://localhost:9000/like/${id}`)
            .then(response => {
                setLikeCount(response.data ?? 0);
            })
            .catch(error => {
                console.error(error);
            });

        // Refresh the number of likes every 10 seconds
        const intervalId = setInterval(() => {
            axios.get(`http://localhost:9000/like/${id}`)
                .then(response => {
                    setLikeCount(response.data ?? 0);
                })
                .catch(error => {
                    console.error(error);
                });
        }, 100);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [id]);

    const handleLike = () => {
        const newLike = !like;
        setLike(newLike);
        setDislike(false);
        const newOpinion = newLike ? 1 : 0;
        // Send a request to update the opinion
        axios.get(`http://localhost:9000/like/${id}/${user.user}/${newOpinion}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
      
      const handleDislike = () => {
        const newDislike = !dislike;
        setDislike(newDislike);
        setLike(false);
        const newOpinion = newDislike ? -1 : 0;
        // Send a request to update the opinion
        axios.get(`http://localhost:9000/like/${id}/${user.user}/${newOpinion}`)
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }

    return (
        <React.Fragment>
            <Tooltip title="Like">
                {like ? (
                    <ThumbUpIcon sx={{ mr: 1, fontSize: "medium" }} onClick={handleLike} />
                ) : (
                    <ThumbUpOutlinedIcon sx={{ mr: 1, fontSize: "medium" }} onClick={handleLike} />
                )}
            </Tooltip>
            <Typography variant="caption" sx={{mr: 1}}>
                {likeCount}
            </Typography>
            <Tooltip title="Dislike">
                {dislike ? (
                    <ThumbDownIcon sx={{ mr: 1, fontSize: "medium" }} onClick={handleDislike} />
                ) : (
                    <ThumbDownOutlinedIcon sx={{ mr: 1, fontSize: "medium" }} onClick={handleDislike} />
                )}
            </Tooltip>
            <Tooltip title="Report">
                <ReportIcon sx={{ fontSize: "medium" }} />
            </Tooltip>
        </React.Fragment>
    );
};

export default ActionButtons;