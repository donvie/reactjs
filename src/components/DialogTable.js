import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Grid from '@mui/material/Unstable_Grid2';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

export default function TableDialog({rows, setRows, childFunc, productData}) {
  const [idNo, idNoValue ] = React.useState(0);
  const [bookTitle, bookTitleValue] = React.useState('');
  const [author, authorValue] = React.useState('');
  const [price, priceValue] = React.useState(0);
  const [description, descriptionValue] = React.useState('');
  const [value, setValue] = React.useState(2);
  const [open, setOpen] = React.useState(false);
  const [value1, setValue1] = React.useState(dayjs('2014-08-18T21:11:54'));
  const descriptionElementRef = React.useRef(null);

  const handleChangeIdNo = (event) => {
    idNoValue(event.target.value);
  };

  const handleChangeBookTitle = (event) => {
    bookTitleValue(event.target.value);
  };

  const handleChangeAuthor = (event) => {
    authorValue(event.target.value);
  };

  const handleChangePrice = (event) => {
    priceValue(event.target.value);
  };

  const handleChangeDescription = (event) => {
    descriptionValue(event.target.value);
  };

  const handleClickOpen = (action) => () => {
    if (action === 'add') {
      window.$product = {}
      idNoValue(0)
      bookTitleValue('')
      authorValue('')
      priceValue(0)
      descriptionValue('')
    } else {
      console.log('scrollType', window.$product)
      const {category, description, id, price, title} = window.$product
      idNoValue(id)
      bookTitleValue(title)
      authorValue(category)
      priceValue(price)
      descriptionValue(description)
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const editaProduct = () => {
    const product = {
      category: author,
      description: description,
      id: parseInt(idNo),
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: parseInt(price),
      rating: {rate: 3.9, count: 120},
      title: bookTitle,
      history: [
        {
          summary: 'Atomic Habits is the definitive guide to breaking bad behaviors and adopting good ones in four steps, showing you how small, incremental, everyday routines compound into massive, positive change over time.',
          published: '16/10/2018',
          rating: 3,
        }
      ]
    }

    let newArr = [...rows];
    let index = newArr.findIndex(arr => arr.id ===  window.$product.id)
    console.log('window.$product', window.$product)
    console.log('newArr', newArr)

    newArr[index] = product;
  
    setRows(newArr);
  };

  const deleteaProduct = () => {
    let newArr = [...rows];
    let index = newArr.findIndex(arr => arr.id ===  window.$product.id)
    newArr.splice(index, 1);
  
    setRows(newArr);
    handleClose()
  };

  const saveProduct = () => {
    if (window.$product.action === 'edit') {
      editaProduct()
    } else if (window.$product.action === 'add') {
      addaProduct()
    } else {
      deleteaProduct()
    }
  };

  const addaProduct = () => {
    const product = {
      category: author,
      description: description,
      id: parseInt(idNo),
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: parseInt(price),
      rating: {rate: 3.9, count: 120},
      title: bookTitle,
      history: [
        {
          summary: 'Atomic Habits is the definitive guide to breaking bad behaviors and adopting good ones in four steps, showing you how small, incremental, everyday routines compound into massive, positive change over time.',
          published: '16/10/2018',
          rating: 3,
        }
      ]
    }

    setRows(oldArray => [...rows, product]);
    idNoValue(0)
    bookTitleValue('')
    authorValue('')
    priceValue(0)
    descriptionValue('')
  };

  const handleChange = (newValue) => {
    setValue1(newValue);
  };

  React.useEffect(() => {
    childFunc.current = handleClickOpen()

    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open, childFunc, productData]);

  return (
    <div>
      <Button onClick={handleClickOpen('add')} sx={{textTransform: "none", bottom: 10}} variant="outlined">Add a product</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          Product
          <CloseIcon onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid xs={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  ID
                </Typography>
                <TextField type="number" onChange={handleChangeIdNo} value={idNo} fullWidth id="filled-basic" placeholder="001" variant="outlined" />
              </Grid>
              <Grid xs={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Book Title
                </Typography>
                <TextField onChange={handleChangeBookTitle} value={bookTitle} fullWidth id="filled-basic" placeholder="Fire&Blood" variant="outlined" />
              </Grid>
              <Grid xs={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Author
                </Typography>
                <TextField onChange={handleChangeAuthor} value={author} fullWidth id="filled-basic" placeholder="George R.R Martin" variant="outlined" />
              </Grid>
              <Grid xs={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Price
                </Typography>
                <TextField type="number" onChange={handleChangePrice} value={price} fullWidth id="filled-basic" placeholder="1500" variant="outlined" />
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Summary
                </Typography>
                <TextField onChange={handleChangeDescription} value={description} multiline rows={5} fullWidth id="filled-basic" placeholder="Fire and Blood begins their tale with the legendary Aegon the Conqueror, creator of the Iron Throne, and goes on to recount the generations of Targaryens who fought to hold that iconic seat, all the way up to the civil war that nearly tore their dynasty apart." variant="outlined" />
              </Grid>
              <Grid xs={12}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Category
                </Typography>
                <Checkbox defaultChecked />
                <Checkbox />
                <Checkbox disabled />
              </Grid>
              <Grid xs={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Published
                </Typography>
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDatePicker
                    inputFormat="MM/DD/YYYY"
                    value={value1}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid xs={6}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 500 }}>
                  Rating
                </Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button fullWidth variant="contained" onClick={saveProduct}>{window.$product?.action}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}