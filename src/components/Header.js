import React, { useEffect, useState } from 'react';
import styles from "./header.module.scss";
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchedProducts } from '../actions/searchedProductsActions';
import Logo from '../images/My project.png'

//icons
import {BsFillCircleFill} from "react-icons/bs";
import { IoMdPerson } from "react-icons/io";
import { HiShoppingCart } from "react-icons/hi";


const Header = (props) =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search,setSearch] = useState('');
    const [cartActive,setCartActive] = useState(false);
    const cartArray = useSelector(state => state.cartArray.cartItems);
    const searchedProducts = useSelector(state => state.searchedProducts);

    const updateSearch = (e) =>{
        setSearch(e?.target?.value);
    }

    const debouncedOnChange = debounce(updateSearch,200);

    // useEffect(()=>{
    //     console.log("Header",products);
    // },[products])

    useEffect (()=>{
        dispatch(getSearchedProducts(search));
    },[search])

    // useEffect (()=>{
    //     console.log("searched products",searchedProducts);
    // },[searchedProducts])

    useEffect (()=>{
        if(cartArray.length > 0){
            setCartActive(true);
        }
    },[cartArray])

    return (
        <header >
            {props.show ? <div className={styles.signUp}>
                <p>Sign up and <span>GET 20% OFF</span> for your first order <span>Sign up now</span></p>
            </div> : null} 
            <div className = {styles.header}>
                <div className={styles.logoTitle}>
                    <img src={Logo} alt=""></img>
                    <h1 onClick={()=>{ navigate("/");}}>Shop</h1>
                    <h1 onClick={()=>{ navigate("/");}}>Up</h1>
                </div>
                <div className={styles.extra}>
                    <span onClick={()=>navigate('/')}>Home</span>
                    <BsFillCircleFill className={styles.circle}/>
                    <span>About</span>
                    <BsFillCircleFill className={styles.circle}/>
                    <span>Contact</span>
                </div>
                <div className={styles.searchIcons}>
                    { props.show ? (
                        <input placeholder="Search" onChange={debouncedOnChange}/> 
                    ) : null }
                        <div className={styles.cart}><HiShoppingCart onClick={()=>{
                            navigate(`/cart`);
                        }} className={styles.icons}/>
                        {cartActive ? <span></span> : null}</div>
                        <div><IoMdPerson className={styles.icons}/></div>
                </div>
            </div>
            
        </header>
    );
};

export default Header;