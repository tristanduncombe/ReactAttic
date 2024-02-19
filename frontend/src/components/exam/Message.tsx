import React, { FC, ReactElement } from "react";
import { Avatar, Box, Card, CardContent, Link, Tooltip, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ActionButtons from "./ActionButtons";

interface MessageProps {
    id: number;
    content: string;
    nickname: string;
    username: string;
    imageUrl: string;
    user: any;
}

export const Message: FC<MessageProps> = ({ id, content, nickname, username, user, imageUrl }): ReactElement => {

    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                mt: "10",
                pt: "1",
                pb: "1",
            }}
        >
            <Card sx={{ py: 2, px: 2, width: '100%' }} elevation={0}>
                <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", mt: 1 }}>
                        <Tooltip title={nickname}>
                            <Link component="a" to={`/user/${username}`}>
                                <Avatar sx={{ width: 32, height: 32, mr: 1 }} src={imageUrl} />
                            </Link>
                        </Tooltip>
                        <Typography variant="body2">{nickname}</Typography>
                    </Box>
                    <Typography sx={{ pt: 2 }}>
                        {content}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start", mt: 1 }}>
                        <ActionButtons user={user} id={id} />
                    </Box>

                </CardContent>

            </Card>
        </Box>
    );
};

export default Message;