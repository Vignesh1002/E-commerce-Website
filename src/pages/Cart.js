import React,{Fragment, useEffect,useState} from 'react';
import Header from '../components/Header';
import styles from './cart.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {BsFillTrashFill} from 'react-icons/bs';
import {AiOutlinePlus,AiOutlineMinus} from 'react-icons/ai';
import FadeLoader from "react-spinners/FadeLoader";
import OrderPortal from '../components/OrderPortal';
import {TbShoppingCartX} from 'react-icons/tb';
import { changeArray, emptyArray } from '../actions/cartArrayActions';


const Cart = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let cartArray = useSelector(state => state.cartArray);
    let total=0;
    let totalDiscount= 0;
    let totalDiscountedAmount = 0;
    let tax = 0;
    const [isOpen, setIsOpen] = useState(false)
    const [totalBill,setTotalBill] = useState(0);
    const [discountedPrice,setDiscountedPrice] = useState(0);
    const [taxAmount,setTaxAmount] = useState(0);
    const [express,setExpress] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0);
    const [opacity,setOpacity] = useState(false);

    // useEffect(()=>{
    //     calculateTotalBill();
    // },[])

    useEffect(() => {
        return () => {
            if(cartArray.cartItems.length !== 0){
                console.log("Hello",cartArray.cartItems);
                cartArray.cartItems.forEach((items)=>{
                    // dispatch(changeArray(items));
                })
                // console.log("Leaving the page..."); 
            }
            console.log("Leaving the page..."); 
        };
      }, []);

    useEffect(()=>{
        calculateTotalBill();
        console.log(cartArray);
    },[cartArray,express])

    // useEffect(()=>{
    //     calculateTotalBill();
    // },[express])

    const increaseQuantity = (index) =>{
        const duplicate = JSON.parse(JSON.stringify(cartArray.cartItems))
        duplicate[index].quantity+=1;
        console.log(duplicate);
        dispatch(changeArray(duplicate));
    }

    const decreaseQuantity = (index) =>{
        const duplicate = JSON.parse(JSON.stringify(cartArray.cartItems))
        if(duplicate[index].quantity > 1){
            duplicate[index].quantity -=1;
        }
        dispatch(changeArray(duplicate));
    }

    const deleteItem = (item) =>{
        cartArray = cartArray.cartItems.filter(obj => obj.id !== item.id);
        console.log(cartArray);
    }

    const calculateTotalBill = () =>{
        cartArray.cartItems.forEach((data)=>{
            let discountedPrice  = data.quantity * data.price;
            let discPerc = 100 - data.discountPercentage;
            let actualPrice = data.quantity * parseInt((data.price * 100)/discPerc);
            total += actualPrice;
            totalDiscountedAmount+=discountedPrice;
        })
        totalDiscount = total -totalDiscountedAmount;
        tax = total * 5 / 100;
        setTotalBill(total);
        setDiscountedPrice(totalDiscount);
        setTaxAmount(tax);
        console.log("Express",total+9.99);
        setTotalAmount(total+tax-totalDiscount+express);
    }

    const expressDelivery =() =>{
        setOpacity(true);
        setExpress(9.99);
    }

    const freeDelivery = () =>{
        setOpacity(false);
        setExpress(0);
    }

    return(
        <div>
            <Header search={false}/>
            <div className={styles.mainContent}>
                <div className={styles.totalCartItems}>
                    <h2>Cart</h2>
                    <div className={styles.cartItems}>
                        {
                            cartArray.loading ? <div className={styles.loader}><FadeLoader  color='#BC8CF2'/></div> : 
                            cartArray.cartItems.length === 0 ? 
                            <div className={styles.circleDiv}>
                                <p className={styles.cartCircle}>
                                    <TbShoppingCartX className={styles.cartIcon}/>
                                </p>
                                <p>Your Cart is Empty!</p>
                                <p>
                                    <p>You have no items in your shopping cart.</p>
                                    <p>Lets go buy something!</p>
                                </p>
                                <button onClick={()=>navigate('/')}>Shop now</button>
                            </div> :
                            (
                                cartArray.cartItems.map((items,index)=>{
                                    return(
                                        <div className={styles.singleCartContainer}>
                                            <img src={items.thumbnail} alt=""/>
                                            <div className={styles.cartDetails}>
                                                <div>
                                                    <p className={styles.title}>{items.title}</p>
                                                    <span className={styles.price}>${items.price}</span>
                                                </div>
                                                <p>{items.stock} stocks remaining</p>
                                                <div className={styles.quantityDelete}>
                                                    <div className={styles.quantityCount}>
                                                        <p onClick={()=>decreaseQuantity(index)}
                                                        className={styles.addMinusQuantity}>
                                                            <AiOutlineMinus/>
                                                        </p>
                                                        <p>
                                                            <input value={items.quantity}></input>
                                                        </p>
                                                        <p onClick={()=>increaseQuantity(index)}
                                                        className={styles.addMinusQuantity}>
                                                            <AiOutlinePlus/>
                                                        </p>
                                                    </div>
                                                    <BsFillTrashFill onClick={()=>deleteItem(items)} className={styles.trash}/>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
               {cartArray.cartItems.length === 0 ? null : 
                (
                        <div className={styles.totalBill}>
                        <h2>Delivery</h2>
                        <div className={styles.delivery}>
                            <button 
                            style={{opacity: opacity ? '0.4' : '1'}}
                            onClick={freeDelivery}>
                                Free
                            </button>
                            <button 
                            style={{opacity: !opacity ? '0.4' : '1'}}
                            onClick={expressDelivery}>
                                Express: $9.99
                            </button>
                        </div>
                        <p className={styles.deliveryDate}>Delivery Date: June 24, 2023</p>
                        <hr/>
                        <div className={styles.promo}>
                            <input placeholder="Promocode"/>
                            <button>Apply</button>
                        </div>
                        <hr/>
                        <div className={styles.billCalculation}>
                            <p>
                                <span>Subtotal</span>
                                <span>${totalBill}</span>
                            </p>
                            <p>
                                <span>Discount</span>
                                <span>- ${discountedPrice}</span>
                            </p>
                            <p>
                                <span>Delivery</span>
                                <span>+ ${express}</span>
                            </p>
                            <p>
                                <span>Tax</span>
                                <span>+ ${taxAmount}</span>
                            </p>
                        </div>
                        <hr/>
                        <p className={styles.totalBillPrice}>
                            <span>Total</span>
                            <span>${totalAmount}</span>
                        </p>
                        <div className={styles.checkoutShoppingButtons}>
                            <button onClick={
                                ()=>{setIsOpen(true);
                                const timer = setTimeout(() => {
                                    navigate('/')
                                    dispatch(emptyArray());
                                      }, 2000); 
                                }
                                }>
                                    Place Order</button>
                            <button onClick={()=>navigate('/')}>Continue Shopping</button>
                            <OrderPortal open={isOpen}/>
                        </div>
                    </div>
                    )
               } 
            </div>
        </div>
    )

}

export default Cart;