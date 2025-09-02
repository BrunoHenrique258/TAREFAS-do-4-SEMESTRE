import React from "react";
import Habits from "./features/habits/Habits";
import { Container, Typography } from "@mui/material";

function App() {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Controle de Hábitos Diários
      </Typography>
      <Habits />
    </Container>
  );
}

export default App;
