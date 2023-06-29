import React, { ReactElement, FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Card, CardHeader, Grid, IconButton, Paper, TextField, Typography } from "@mui/material";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
    title: JSX.Element[];
    content: JSX.Element[];
    defaultState: boolean;
    elevation?: number;
}

const CollapsableCard = ({ title, content, defaultState, elevation = 3 }: Props) => {
    const [expanded, setExpanded] = useState<boolean>(defaultState);

    return (
        <Paper elevation={elevation} sx={{ p: 2, width: "100%", mt: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                { title }
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

export default CollapsableCard;