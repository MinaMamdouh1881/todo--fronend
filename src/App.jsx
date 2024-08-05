import NavBar from './components/NavBar';
import AddTodo from './components/AddTodo';
import ToDos from './components/ToDos';
import LoadingModule from './components/LoadingModule';
import { useSelector } from 'react-redux';

function App() {
  const { isLoading } = useSelector((store) => store.toDo);

  return (
    <>
      <NavBar />
      <AddTodo />
      <ToDos />
      {isLoading && <LoadingModule />}
    </>
  );
}

export default App;
