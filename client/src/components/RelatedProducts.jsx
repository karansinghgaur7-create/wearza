import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext.jsx';
import ProductItem from '../components/collection/ProductItem';

const RelatedProducts = ({ category, subCategory }) => {

  const { products } = useContext(ShopContext);

  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {

      let productsCopy = products.slice();

      productsCopy = productsCopy.filter(
        (item) => category === item.category
      );

      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );

      setRelated(productsCopy.slice(0, 5));
    }
  }, [products, category, subCategory]);

  return (
    <div className="related-products">

      <div className="related-title">
        <h2>RELATED PRODUCTS</h2>
      </div>

      <div className="related-grid">
        {related.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>

    </div>
  );
};

export default RelatedProducts;