import axios from "axios";
import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import Rating from "./Rating";

const ProductCard = (props) => {
    const { product } = props;
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const {
        cart: { cartItems },
    } = state;

    const addToCartHandler = async (item) => {
        const existItem = cartItems.find((x) => x.id === product.id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        // const { data } = await axios.get(`/api/produts/${product.id}`);

        // if (data.product[0].stock < quantity) {
        // 	window.alert('Product is out of stock!');
        // 	return;
        // }
        ctxDispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    };

    return (
        <div>
            <div className="product">
                <div className="image">
                    <div className="box">
                        <Link to={`/product/${product.slug}`}>
                            <img
                                src={product.image}
                                alt={product.name}
                                class="main-img "
                            />
                            <img
                                src={product.image}
                                alt={product.name}
                                class="sub-img"
                            />
                        </Link>
                    </div>

                    <div className="product-tag">
                        <div className="like">
                            <i className="fa-light fa-heart"></i>
                        </div>
                        <h5>New</h5>
                    </div>
                    <div className="product-action">
                        <div className="compare">
                            <i className="fa-thin fa-sliders-up"></i>
                            <div className="p-tooltip">Compare</div>
                        </div>
                        <div className="quickview">
                            <i className="fa-light fa-eye"></i>
                            <div className="p-tooltip">Quick View</div>
                        </div>
                    </div>
                </div>

                <div class="content">
                    <Link to={`/product/${product.slug}`}>
                        <h4>{product.name}</h4>
                    </Link>
                    <h5>$ {product.price}</h5>
                    <div class="review-star">
                        <Rating
                            rating={product.rating}
                            numReviews={product.numReviews}></Rating>
                    </div>
                    {product.stock === 0 ? (
                        <Button className="btn-add-product" disabled>
                            OUT OF STOCK
                        </Button>
                    ) : (
                        <Button
                            className="btn-add-product"
                            onClick={() => addToCartHandler(product)}>
                            ADD TO CART
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
