import React from 'react'
import { Link } from "react-router-dom"
import { FaPlus, FaList, FaShoppingBag } from "react-icons/fa"

const Slidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

        <Link
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/add"
        >
          <FaPlus className='w-5 h-5' />
          <p className='hidden md:block'>Add Item</p>
        </Link>

        <Link
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/list"
        >
          <FaList className='w-5 h-5' />
          <p className='hidden md:block'>List Item</p>
        </Link>

        <Link
          className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          to="/orders"
        >
          <FaShoppingBag className='w-5 h-5' />
          <p className='hidden md:block'>Order</p>
        </Link>

      </div>
    </div>
  )
}

export default Slidebar