import React from 'react';

const ProductCard = ({ product }) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure className='h-52 w-52'>
                <img
                    src={product.product_image}
                    alt={product.product_name} />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{product.product_name}</h2>
                <p>{product.Description}</p>
               
            </div>
        </div>
    );
};

export default ProductCard;