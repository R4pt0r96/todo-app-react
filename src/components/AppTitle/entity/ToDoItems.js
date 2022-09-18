import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Collapse,
  Box,
  Typography,
  Alert,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEntities } from '../../../reducer/entityReducer/toDoSlice';

import './ToDoItems.scss';

const RowTable = ({ note, category }) => {
  const [open, setOpen] = React.useState(false);

  const convertDate = (date) => {
    const dateConverted = new Date(date);
    return (
      dateConverted.getDate() +
      '/' +
      (dateConverted.getMonth() + 1) +
      '/' +
      dateConverted.getFullYear()
    );
  };

  return (
    <>
      <TableRow
        className='row_todo'
        sx={{ '& > *': { borderBottom: 'unset' } }}
      >
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row' align='left'>
          {note.text}
        </TableCell>
        <TableCell align='center'>{convertDate(note.creationDate)}</TableCell>
        <TableCell align='center'>
          {note.completedDate ? convertDate(note.completedDate) : 'in corso'}
        </TableCell>
        <TableCell align='right'>Pulsanti</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Info
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Note extra</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {note.extraNote
                        ? note.extraNote
                        : 'Nessuna nota aggiuntiva'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Categoria</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{category.categoryName}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const ToDoItems = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.toDo.entities);
  const isLoading = useSelector((state) => state.toDo.isLoading);

  useEffect(() => {
    dispatch(getEntities());
  }, [dispatch]);

  if (rows.length === 0) {
    return (
      <Alert severity='info' variant='filled' style={{ marginTop: '2rem' }}>
        Nessuna nota creata
      </Alert>
    );
  }

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TableContainer className='todo_table_container'>
          <Table aria-label='collapsible table todo_table'>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nota</TableCell>
                <TableCell align='right'>Data Creazione</TableCell>
                <TableCell align='right'>Data Completamento</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {rows &&
                rows.map((row) => (
                  <RowTable key={row.id} note={row} category={row.category} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ToDoItems;
