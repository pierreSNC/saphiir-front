import React from 'react';
import './ProductCard.css'

const ProductCard = ({
    thumbnail,
    thumbnailAlt,
    title,
    price,
    defaultClass = 'card'
                     }) => {
    return (
        <div className={defaultClass}>
            <div className={'thumbnail'}>
                <img src={thumbnail} alt={thumbnailAlt} />
            </div>
            <div className={'content'}>
                <h4>{title}</h4>
                <span>{price.toFixed(2)}$</span>
            </div>
        </div>
    );
};

export default ProductCard;