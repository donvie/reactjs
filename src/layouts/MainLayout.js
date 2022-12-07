import { Route, Routes, Link } from "react-router-dom";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import Home from '../pages/Home';
import Product from '../pages/Product';
import Todo from '../pages/Todo';

function MainLayout() {
  return (
    <div>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Reactjs / Material UI Design
          </Typography>

          <Grid container spacing={2}>
            <Grid>
              <Link to="/">Home</Link>
            </Grid>
            <Grid>
              <Link to="/product-table">Product Table Exercise</Link>
            </Grid>
            <Grid>
              <Link to="/todo-app">Todo app</Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product-table" element={<Product />} />
        <Route path="/todo-app" element={<Todo />} />
      </Routes>
    </div>
  );
}

export default MainLayout;
