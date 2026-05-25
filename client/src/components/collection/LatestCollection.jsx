// LatestCollection.jsx
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext.jsx'
import ProductItem from './ProductItem'
import './collection.css'

const LatestCollection = () => {
  const { products } = useContext(ShopContext)

  const [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products?.slice(0, 10) || [])
  }, [products])

  return (
    <div className="collection container">
      <h2 className="collection-title">
        <span>LATEST</span> COLLECTION
      </h2>

      <p className="collection-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>

      <div className="collection-list">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection