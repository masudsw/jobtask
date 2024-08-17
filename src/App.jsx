
import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'

const App = () => {
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [currentPage, setCurrentPage] = useState(1)
  const [count, setCount] = useState(0)
  const [filter, setFilter] = useState('')
  const [sort, setSort] = useState('')
  const [search, setSearch] = useState('')
  const [searchText, setSearchText] = useState('')
  const [products, setProducts] = useState([])
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios(
        `http://localhost:5000/products?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`
      )
      setProducts(data)
    }
    getData()
  }, [currentPage, filter, itemsPerPage, search, sort])
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(
        `http://localhost:5000/products-count?filter=${filter}&search=${search}`
      )

      setCount(data.count)
    }
    getCount()
  }, [filter, search])

  console.log(count)
  const numberOfPages = Math.ceil(count / itemsPerPage)
  const pages = [...Array(numberOfPages).keys()].map(element => element + 1)

  //  handle pagination button
  const handlePaginationButton = value => {
    console.log(value)
    setCurrentPage(value)
  }
  const handleReset = () => {
    setFilter('')
    setSort('')
    setSearch('')
    setSearchText('')
  }

  const handleSearch = e => {
    e.preventDefault()

    setSearch(searchText)
  }

  console.log(search)
  return (
    <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
      <div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
          

          <form onSubmit={handleSearch}>
            <div className='flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                onChange={e => setSearchText(e.target.value)}
                value={searchText}
                name='search'
                placeholder='Enter Product Name'
                aria-label='Enter Product Name'
              />

              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              onChange={e => {
                setSort(e.target.value)
                setCurrentPage(1)
              }}
              value={sort}
              name='sort'
              id='sort'
              className='border p-4 rounded-md'
            >
              <option value=''>Sort By------</option>
              <option value='dsc'>Low to High price</option>
              <option value='asc'> High to Low price</option>
              <option value='newest'>Newest to oldest date</option>

            </select>
          </div>
          <div>
            <select
              onChange={e => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
              value={filter}
              name='category'
              id='category'
              className='border p-4 rounded-lg'
            >
              <option selected value='Electronics'>Electronics</option>
              <option value='Computers'>Computers</option>
              <option value='Mobile_Phones'>Mobile Phones</option>
              <option value='Transport'>Transport</option>
              <option value='Wearables'>Wearables</option>
              <option value='Smart_Home'>Smart Home</option>
              <option value='Cameras'>Cameras</option>
              <option value='Audio'>Audio</option>
              <option value='Accessories'>Accessories</option>
              <option value='Home_Appliances'>Home Appliances</option>
              <option value='Personal Care'>Personal Care</option>
              <option value='Storage'>Storage</option>
              <option value='Networking'>Networking</option>
              <option value='Kitchen_Appliances'>Kitchen Appliances</option>
            </select>
          </div>
          <div>
            <select
              onChange={e => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
              value={filter}
              name='brand'
              id='brand'
              className='border p-4 rounded-lg'
            >
              
              <option selected value='samsung'>samsung</option>
              <option value='Anik'>Anik</option>
              <option value='Sony'>Sony</option>
              <option value='Walton'>Walton</option>
              <option value='Sony'>Sony</option>
            </select>
          </div>
          <div>
            <select
              onChange={e => {
                setFilter(e.target.value)
                setCurrentPage(1)
              }}
              value={filter}
              name='price_range'
              id='price_range'
              className='border p-4 rounded-lg'
            >
              
              <option selected value='fifty'>0-50</option>
              <option value='hundred'>51-100</option>
              <option value='five_hundred'>101-500</option>
              <option value='thousand'>501-1000</option>
              <option value='five_thousand'>1001-5000</option>
            </select>
          </div>
          <button onClick={handleReset} className='btn'>
            Reset
          </button>
        </div>
        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* Pagination Section */}
      <div className='flex justify-center mt-12'>
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationButton(currentPage - 1)}
          className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white'
        >
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>
        {/* Numbers */}
        {pages.map(btnNum => (
          <button
            onClick={() => handlePaginationButton(btnNum)}
            key={btnNum}
            className={`hidden ${
              currentPage === btnNum ? 'bg-blue-500 text-white' : ''
            } px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}
        {/* Next Button */}
        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationButton(currentPage + 1)}
          className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'
        >
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

export default App
