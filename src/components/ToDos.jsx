import { MdDelete, MdModeEdit } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllToDos,
  deleteToDo,
  editToDo,
  setInputText,
  setLoading,
} from '../features/toDoSlice';
import { memo } from 'react';
import { useEffect } from 'react';
// eslint-disable-next-line react/prop-types
function ToDos() {
  const dispatch = useDispatch();
  const { toDos, inputText } = useSelector((store) => store.toDo);
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getAllToDos());
    dispatch(setLoading(false));
  }, []);

  return (
    <div className='flex flex-col items-center mt-5'>
      {!toDos.length ? (
        <h1 className='gap-20 border-2 border-blue-800 bg-blue-600 rounded-md py-4 mt-3 px-3 text-center text-blue-100 text-xl font-semibold max-sm:w-80 sm:w-[400px]'>
          There Is No To Dos Here
        </h1>
      ) : (
        toDos.map((el) => {
          const { _id, text } = el;
          return (
            <div
              key={_id}
              className='flex flex-row justify-between gap-20 border-2 border-blue-800 bg-blue-600 rounded-md py-4 mt-3 px-3 max-sm:w-80 sm:w-[400px]'
            >
              <h1 className='text-blue-100 text-xl font-semibold'>{text}</h1>
              <div className='flex flex-row justify-between items-center gap-2'>
                <button
                  onClick={async () => {
                    dispatch(setLoading(true));
                    await dispatch(deleteToDo(_id));
                    await dispatch(getAllToDos());
                    dispatch(setLoading(false));
                  }}
                >
                  <MdDelete size={20} color='#dbeafe' />
                </button>
                <button
                  onClick={async () => {
                    dispatch(setLoading(true));
                    await dispatch(editToDo({ _id, inputText }));
                    await dispatch(getAllToDos());
                    await dispatch(setInputText(''));
                    dispatch(setLoading(false));
                  }}
                >
                  <MdModeEdit size={20} color='#dbeafe' />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default memo(ToDos);
