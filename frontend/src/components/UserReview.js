import React from 'react';
import Rating from './Rating';

const UserReview = (props) => {
	const { rating } = props;
	const { comment } = props;
	const { userName } = props;
	return (
		<div class="user-review">
			<div class="review-star d-flex align-items-center">
				<Rating rating={rating}></Rating>
			</div>
			<div class="user-name">{userName}</div>
			<div class="description">{comment}</div>
		</div>
	);
};

export default UserReview;
