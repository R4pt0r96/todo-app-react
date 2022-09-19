import './App.css';
import AppTitle from './components/AppTitle/AppTitle';
import AddToDo from './components/entity/AddToDo';
import ToDoItems from './components/entity/ToDoItems';

function App() {
  return (
    <div className='App'>
      <AppTitle title={'My To-Do App'} />
      <AddToDo />
      <ToDoItems />
    </div>
  );
}

export default App;
