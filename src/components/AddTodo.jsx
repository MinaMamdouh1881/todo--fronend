import { useDispatch, useSelector } from 'react-redux';
import { memo } from 'react';
import {
  setInputText,
  addToDo,
  getAllToDos,
  setLoading,
} from '../features/toDoSlice';
function AddTodo() {
  const dispatch = useDispatch();
  const { inputText } = useSelector((store) => store.toDo);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    await dispatch(addToDo(inputText));
    await dispatch(getAllToDos());
    await dispatch(setInputText(''));
    dispatch(setLoading(false));
  };
  return (
    <form
      className='flex justify-center items-center mt-10 gap-10 px-5'
      onSubmit={(e) => submitHandler(e)}
    >
      <input
        type='text'
        name='text'
        placeholder='Enter ToDos'
        className='w-96 border-b-2 border-blue-800 p-2 focus:outline-none'
        value={inputText}
        onChange={(e) => {
          dispatch(setInputText(e.target.value));
        }}
      />
      <button className='py-2 px-4 border-2 border-blue-800 rounded-xl bg-blue-600 text-white font-semibold'>
        Add
      </button>
    </form>
  );
}

export default memo(AddTodo);
