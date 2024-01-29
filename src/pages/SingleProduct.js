import React,{useEffect,useState} from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getSingleProduct } from '../actions/singleProductActions';
import Header from '../components/Header';
import styles from './singleProduct.module.scss';
import FadeLoader from "react-spinners/FadeLoader";
import {BsCartPlusFill} from "react-icons/bs";
import { updateArray } from '../actions/cartArrayActions';



const SingleProduct = () =>{
    let cartArray = useSelector(state => state.cartArray.cartItems);
    const dispatch = useDispatch();
    const product = useSelector(state => state.singleProduct || []);
    let { id } = useParams();

    useEffect(()=>{
        console.log(id);
        dispatch(getSingleProduct(id));
    },[])

    useEffect(()=>{
        console.log("Product id",product);
    },[product])

    const getActualPrice = (price,discountPercentage) =>{
        discountPercentage = 100 - discountPercentage;
        let actualPrice = parseInt((price * 100)/discountPercentage);
        return actualPrice;
    }

    const addToCart = () =>{
        if(!(cartArray.some((obj)=>JSON.stringify(obj.id) === JSON.stringify(product.product.id)))){
            product.product.quantity = 1;
            dispatch(updateArray(product.product));
        }
        else{
            cartArray.forEach((obj)=>{
                if(obj.id === product.product.id){
                    obj.quantity +=1;
                }
            })
        }

        console.log(cartArray);
        console.log("Product",product);
    }

    return(
        <div className={styles.container}>
            <Header search={false}/>
            <div className={styles.singleProduct}>
                <div className={styles.centreDiv}>
                    <div className={styles.singleProductImages}>
                        <div>
                            <img className={styles.mainImage} src={product.product.thumbnail} alt=""></img>
                        </div>
                        <div className={styles.sideImages}>
                        {
                            product.loading ? <div className={styles.loader}><FadeLoader  color='#BC8CF2'/></div> : (
                                product.product.images.map((item)=>{
                                    return(
                                        <img src={item} alt=""></img>
                                    )
                                })
                            )
                        }
                        </div>
                    </div>
                    <div className={styles.singleProductContent}>
                            <h3>{product.product.title}</h3>
                            <div>{product.product.description}</div>
                            <div className={styles.productDetails}>
                                <p>
                                    <span>Rating:</span>
                                    <span> {product.product.rating}</span>
                                </p>
                                <p>|</p>
                                <p>
                                    <span>Brand:</span>
                                    <span> {product.product.brand}</span>
                                </p>
                                <p>|</p>
                                <p>
                                    <span>Category:</span>
                                    <span> {product.product.category}</span>
                                </p>
                            </div>
                            <div className={styles.priceBox}>
                                <div>
                                    <s>${getActualPrice(product.product.price,product.product.discountPercentage)}</s>
                                    <span>Inclusive of all taxes</span>
                                </div>
                                <div>
                                    <span>${product.product.price}</span>
                                    <span>{product.product.discountPercentage}% OFF</span>
                                </div>
                            </div>
                            <button onClick={addToCart}>
                                Add to Cart
                                <BsCartPlusFill style={{fontSize:'1rem'}}/>
                            </button>        
                    </div>


                    
                </div>
            </div>
        </div>
    )
} 

export default SingleProduct;

