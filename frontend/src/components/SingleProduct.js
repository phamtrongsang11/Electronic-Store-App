import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const SingleProduct = (props) => {
	const { product } = props;
	return (
		<div className="single-product">
			<Link to={`/product/${product.slug}`}>
				<div className="box_img">
					<img src={product.image} alt={product.name} />
				</div>
			</Link>

			<div className="content">
				<Link to={`/product/${product.slug}`}>
					<h4>{product.name}</h4>
				</Link>
				<h5>$ {product.price}</h5>
				<div className="review-star">
					<Rating
						rating={product.rating}
						numReviews={product.numReviews}
					></Rating>
				</div>
			</div>
		</div>
	);
};

export default SingleProduct;
