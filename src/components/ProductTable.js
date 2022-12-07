import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Chip from '@mui/material/Chip';
import DialogTable from './DialogTable'

function createData(id, category, description, image, price, rating, title) {
  return {
    id,
    category,
    description,
    image,
    price,
    rating,
    title,
    history: [
      {
        summary: 'Atomic Habits is the definitive guide to breaking bad behaviors and adopting good ones in four steps, showing you how small, incremental, everyday routines compound into massive, positive change over time.',
        published: '16/10/2018',
        rating: 3,
      }
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickProduct = (row, action) => {
    row.action = action
    window.$product = row;
    viewDialog.current()
  };

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell component="th" scope="row">
          {row.id}
        </TableCell>
        <TableCell align="center">{row.title}</TableCell>
        <TableCell align="center">
          <Chip label={row.category} />
        </TableCell>
        <TableCell align="center">{row.description}</TableCell>
        <TableCell align="center">{row.price}</TableCell>
        <TableCell align="center">{row.price}</TableCell>
        <TableCell align="center">
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            
          <Button onClick={(event) => handleClickProduct(row, 'edit')}>Edit</Button>
          <Button onClick={(event) => handleClickProduct(row, 'delete')}>Delete</Button>
          </Box>
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Summary</TableCell>
                    <TableCell>Published</TableCell>
                    <TableCell align="right">Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.summary}
                      </TableCell>
                      <TableCell>{historyRow.published}</TableCell>
                      <TableCell align="right">{historyRow.rating}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        summary: PropTypes.string.isRequired,
        published: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

let viewDialog

export default function ProductTable() {
  const [productData] = React.useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const childFunc = React.useRef()
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    viewDialog = childFunc
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const newData = await response.json();
      console.log('newData', newData)
      const mapData = newData.map(product =>
        createData(product.id, product.category, product.description, product.image, product.price, product.rating, product.title)
      )
      setRows(mapData);
    };

    fetchData();
  }, []);

  return (
    <Box margin={'78px'}>
      <DialogTable productData={productData} childFunc={childFunc} rows={rows} setRows={setRows}></DialogTable>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead sx={{ background: '#326295', color: '#FFFFFF' }}>
            <TableRow>
              <TableCell />
              <TableCell sx={{ color: '#FFFFFF' }}>ID</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }} align="center">Book Title</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }} align="center">Author</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }} align="center">Category</TableCell>
              <TableCell sx={{ color: '#FFFFFF' }} align="center">Price</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Box>
  );
}