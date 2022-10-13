import Box from '@mui/material/Box';
import SaveAsSharpIcon from '@mui/icons-material/SaveAsSharp';
import Modal from '@mui/material/Modal';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { modifyEntity } from '../../reducer/entityReducer/toDoSlice';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditToDo = ({ todo, open, handleClose }) => {
  const dispatch = useDispatch();
  const [checkInput, setCheckInput] = useState(false);

  const handleSubmitToDo = (event) => {
    event.preventDefault();
    if (event.target.noteText.value === '') {
      setCheckInput((state) => {
        return true;
      });
    } else {
      setCheckInput((state) => {
        return false;
      });
    }

    if (event.target.noteText.value !== '') {
      const toDoData = {
        ...todo,
        text: event.target.noteText.value,
        extraNote: event.target.extraNote.value,
      };

      dispatch(modifyEntity(toDoData));
      handleClose();
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <form onSubmit={handleSubmitToDo}>
          <TextField
            id='filled-basic'
            label='Inserisci Nota'
            variant='filled'
            margin='normal'
            fullWidth
            color='warning'
            className='input_nota'
            name='noteText'
            defaultValue={todo.text}
            error={checkInput}
          />

          <TextField
            id='filled-basic'
            label='Inserisci note extra'
            variant='filled'
            margin='normal'
            fullWidth
            color='warning'
            className='input_nota'
            name='extraNote'
            defaultValue={todo?.extraNote}
          />

          <Button
            type='submit'
            variant='contained'
            color='success'
            endIcon={<SaveAsSharpIcon />}
          >
            Aggiorna
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditToDo;
