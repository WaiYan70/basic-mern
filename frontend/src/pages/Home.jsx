import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import ProductsTable from '../components/home/ProductsTable';
import ProductsCard from '../components/home/ProductsCard';
import { MdOutlineAddBox } from 'react-icons/md';

const Home = () => {
  const [products, setProducts ] = useState([]);
  const [loading, setLoading ] = useState(false);
  const [showType, setShowType]  = useState('table');
  useEffect(()=>{
    setLoading(true);
    axios
      .get('http://localhost:5555/products')
      .then((response) => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error)=>{
        console.log(error);
      })
  },[]);

  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button 
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button 
          className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8 text-blue-500'>Products List</h1>
        <Link to='/products/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl'/>
        </Link>
      </div>
      {
        loading ? ( 
          <Spinner /> 
        ) : showType === 'table' ? (
          <ProductsTable products={products} />
        ) : (
          <ProductsCard products={products} />
        )
      }
    </div>
  )
}

export default Home;