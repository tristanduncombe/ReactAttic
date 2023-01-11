import React, { ReactElement, FC } from "react";
import { Box, Card, CardHeader, Grid, Paper, Typography } from "@mui/material";

const Courses: FC<any> = (): ReactElement => {


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
      <Paper sx={{minWidth: "60%", px: 3, py: 3}}>
        <Typography variant="h4">
          Find a Solution to your Assignment or Test!
        </Typography>
        <Typography variant="h6">
          I'm looking for answers for a past exam or assignment
        </Typography>
        <Grid container spacing={2} sx={{mt: 3}}>
          <Grid item xs={6}>
            <Card elevation={3} sx={{py: 2, px: 2}}>
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
      </Paper>

    </Box>
  );
};

export default Courses;