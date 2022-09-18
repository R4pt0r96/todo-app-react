import './App.css';
import AppTitle from './components/AppTitle/AppTitle';
import ToDoItems from './components/AppTitle/entity/ToDoItems';

function App() {
  return (
    <div className='App'>
      <AppTitle title={'My To-Do App'} />
      <ToDoItems />
    </div>
  );
}

export default App;
