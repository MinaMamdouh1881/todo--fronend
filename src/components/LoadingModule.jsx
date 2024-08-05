import ClipLoader from 'react-spinners/ClipLoader';
import { memo } from 'react';
import { useSelector } from 'react-redux';
function LoadingModule() {
  const { isLoading } = useSelector((store) => store.toDo);
  return (
    <>
      <div className='w-full h-full absolute top-0 left-0 bg-black opacity-60'></div>
      <div className='flex w-full h-full absolute top-0 left-0 justify-center items-center'>
        <ClipLoader color='#1d4ed8' loading={isLoading} size={150} />
      </div>
    </>
  );
}

export default memo(LoadingModule);
