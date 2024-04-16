import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner'

const EditProduct = () => {
  const [ title, setTitle ] = useState('');
  const [ author, setAuthor ] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading ] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
    .get(`http://localhost:5555/products/${id}`)
    .then((response) => {
      setTitle(response.data.title);
      setAuthor(response.data.author);
      setPublishYear(response.data.publishYear);
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      alert('An error happened, Please Check Console');
      console.log(error);
    })
  }, [])
  const handleEditProduct = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/products/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error)=> {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      })
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Product</h1>
      { loading ? <Spinner/> : '' }
      <div className='flex flex-col border-2 bordewr-sky-400 rounded-xl w-{600px} p-4 mx-auto'>
        {/* Title */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        {/* Author */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input 
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        {/* Publish YEar */}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input 
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditProduct}>
          Save
        </button>
      </div>
    </div>
  )
}

export default EditProduct;