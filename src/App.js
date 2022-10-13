import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import './App.css';
import AppTitle from './components/AppTitle/AppTitle';
import AddToDo from './components/entity/AddToDo';
import ToDoItems from './components/entity/ToDoItems';
import Message from './components/Message';

function App() {
  const open = useSelector((state) => state.toDo.isLoading);

  return (
    <div className='App'>
      <AppTitle title={'My To-Do App'} />
      <AddToDo />
      <ToDoItems />
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Message />
    </div>
  );
}

export default App;
