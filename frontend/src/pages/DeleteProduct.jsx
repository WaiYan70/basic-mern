import { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const DeleteProduct = () => {
  const [ loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteProduct = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/products/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occured, Please Check Console');
        console.log(error);
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1>Delete Product</h1>
      { loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are you sure that you want to delete this product?</h3>
        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteProduct}
        >
          Yes, delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteProduct