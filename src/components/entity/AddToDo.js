import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import './AddToDo.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { getEntities as getCategories } from '../../reducer/entityReducer/categorySlice';
import { saveEntity as saveToDo } from '../../reducer/entityReducer/toDoSlice';

const AddToDo = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.entities);

  const [categoria, setCategoria] = useState('');
  const [checkInput, setCheckInput] = useState({
    noteText: false,
    category: false,
  });

  const inputNoteRef = useRef('');

  const handleChangeCategory = (event) => {
    setCategoria(event.target.value);
  };

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmitToDo = (event) => {
    event.preventDefault();
    if (event.target.noteText.value === '') {
      setCheckInput((state) => {
        return { ...state, noteText: true };
      });
    } else {
      setCheckInput((state) => {
        return { ...state, noteText: false };
      });
    }
    if (event.target.category.value === '') {
      setCheckInput((state) => {
        return { ...state, category: true };
      });
    } else {
      setCheckInput((state) => {
        return { ...state, category: false };
      });
    }

    if (
      event.target.noteText.value !== '' &&
      event.target.category.value !== ''
    ) {
      const toDoData = {
        text: event.target.noteText.value,
        category: { id: event.target.category.value },
      };

      dispatch(saveToDo(toDoData));
      setCategoria(() => '');
      inputNoteRef.current.value = '';
    }
  };

  return (
    <form className='addnota_form' onSubmit={handleSubmitToDo}>
      <TextField
        id='filled-basic'
        label='Inserisci Nota'
        variant='filled'
        margin='normal'
        fullWidth
        color='warning'
        className='input_nota'
        error={checkInput.noteText}
        name='noteText'
        inputRef={inputNoteRef}
      />
      <FormControl fullWidth sx={{ mt: 1, mb: 2 }}>
        <InputLabel id='demo-simple-select-label'>Categoria</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={categoria}
          label='Categoria'
          onChange={handleChangeCategory}
          name='category'
          error={checkInput.category}
        >
          {categories &&
            categories.map((cat) => {
              return (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <Button
        type='submit'
        variant='contained'
        color='success'
        endIcon={<AddIcon />}
      >
        Aggiungi
      </Button>
    </form>
  );
};

export default AddToDo;
