import React, { ReactElement, FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, CardHeader, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    title: string;
    content: JSX.Element[];
    defaultState: boolean;
}

const HideCard = ({ title, content, defaultState }: Props) => {
    const [expanded, setExpanded] = useState<boolean>(defaultState);

    return (
        <Paper elevation={3} sx={{ p: 2, width: "100%", mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography component="div" variant="h5">
                    { title }
                </Typography>
                <IconButton
                    onClick={() => setExpanded(expanded ? false : true)}
                    sx={{ p: 1 }}
                >
                    {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
            </Box>
            {expanded && (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    { content }
                </Box>
            )}
        </Paper>
    );
};

export default HideCard;