import React, { useContext } from 'react'
import { ShopContext } from '../../context/shopContext'
import { Link } from 'react-router-dom'
import './collection.css'


const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  const productImage =
    Array.isArray(image) && image.length > 0
      ? image[0]
      : '/fallback-image.png'

  return (
    <Link className="product-item" to={`/product/${id}`}>
      <div className="product-image">
        <img src={productImage} alt={name} />
      </div>

      <p className="product-name">{name}</p>

      <p className="product-price">
        {currency} {price}
      </p>
    </Link>
  )
}

export default ProductItem