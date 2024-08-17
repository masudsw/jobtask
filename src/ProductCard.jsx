import React from 'react';

const ProductCard = ({product}) => {
    return (
        <div>
            <h1>${product.Description}</h1>
        </div>
    );
};

export default ProductCard;