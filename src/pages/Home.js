import React,{useEffect,useState} from 'react';
import Slider from 'react-slider';
import styles from './home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FadeLoader from "react-spinners/FadeLoader";

//toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//actions
import { getAllProducts } from '../actions/allProductsActions';
import { getAllCategories } from '../actions/categoriesActions';
import { updateArray } from '../actions/cartArrayActions';

//icons
import { HiShoppingCart } from "react-icons/hi";
import {BiDownArrow} from "react-icons/bi";
import {VscSearchStop} from "react-icons/vsc";

//components
import Header from '../components/Header';
import { updateSearchedProducts } from '../actions/searchedProductsActions';

//constants
const MIN = 0;
const MAX = 2000;



const Home = () =>{
    const [values,setValues] = useState([MIN,MAX]);
    const [toggleListValue,setToggleListValue] = useState(false);
    const [checked,setChecked] = useState([]);
    const [mainProducts,setMainProducts] = useState([]);
    const [opacity,setOpacity] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const allProducts = useSelector(state => state.allProducts);
    const categories = useSelector(state => state.categories.categories);
    const searchedProducts = useSelector(state => state.searchedProducts);
    const cartArray = useSelector(state => state.cartArray.cartItems);

    useEffect(()=>{
        dispatch(getAllProducts());
        dispatch(getAllCategories());
        setMainProducts(searchedProducts);
    },[]);
console.log(checked);
    useEffect(()=>{
        setMainProducts(searchedProducts);
        console.log("Main",mainProducts);
    },[searchedProducts,mainProducts]);

    // useEffect(()=>{
    //     dispatch(updateArray());
    // },[cart])


    const getActualPrice = (price,discountPercentage) =>{
        discountPercentage = 100 - discountPercentage;
        let actualPrice = parseInt((price * 100)/discountPercentage);
        return actualPrice;
    }

    const handleChange = (e) =>{
        setOpacity(true);
        let updatedList = [...checked];
        if (e.target.checked) {
            updatedList = [...checked, e.target.value];
          } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
          }
          setChecked(updatedList);
    }

    const applyFilter = () =>{
        
        let newList;
        
        if(checked.length !== 0){
            newList = allProducts.product.filter(
                (item) => checked.some((items)=>
                    items === item.category
                )
            )

            newList = newList.filter(
                (item) => item.price >= values[0] && item.price <= values[1]
            )
            // searchedProducts.products = newList;
        }
        else{
            newList = allProducts.product.filter(
                (item) => item.price >= values[0] && item.price <= values[1]
            )
        }

        

        // searchedProducts.products = newList;
        dispatch(updateSearchedProducts(newList));
        
        console.log("New List",newList);
        console.log("Searched Products",searchedProducts);
    }

    const cartItems = (items) =>{
        if(!(cartArray.some((obj)=>JSON.stringify(obj.id) === JSON.stringify(items.id)))){
            items.quantity = 1;
            dispatch(updateArray(items));
        }
        else{
            cartArray.forEach((obj)=>{
                if(obj.id === items.id){
                    obj.quantity +=1;
                }
            })
            // items.quantity +=1;
            // dispatch(updateArray(items));
        }
        console.log(cartArray);
    }

    const showToastMessage = () => {
        toast.success('Added to Cart !', {
            position: toast.POSITION.BOTTOM_CENTER,
            style:{
                backgroundColor: '#BC8CF2',
                color: '#fff'
            }
        });
    };

    const capitalizeFirst = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      };
    

    return(

        <div>
            <Header show = {true}/>
            <article className={styles.mainContent}>
                <section className={styles.sideContainer}>
                    <div>
                        <span className={styles.priceSpan}>Price</span>
                        <div id="price" className={styles.priceSlider}>
                            <div className={styles.priceInput}>
                                <div className={styles.field}>
                                <span>Min</span>
                                <input type="number" class="input-min" value={values[0]}/>
                                </div>
                                <div className={styles.separator}>-</div>
                                <div className={styles.field}>
                                <span>Max</span>
                                <input type="number" class="input-max" value={values[1]}/>
                                </div>
                            </div>
                            <Slider
                            className={styles.slider}
                            onChange={setValues}
                            value={values}
                            min={MIN}
                            max={MAX}/>
                        </div>
                    </div>
                    <div className={styles.categoriesCheckList}>
                            <div onClick={()=> setToggleListValue(!toggleListValue)} className={styles.checkListCaption}>
                                <span>Categories</span>
                                <BiDownArrow/>
                            </div>
                           {toggleListValue ? (
                                <ul className={styles.listContainer}>
                                {categories.map((items)=>{
                                    return(
                                        <li className={styles.checkList} style={{ opacity: checked.includes(items) ? 1 : 0.5 }}>
                                                <input style={{ marginRight: '8px'}} id={items} type='checkbox' onChange={handleChange} value={items}/> 
                                                <label htmlFor={items}>{capitalizeFirst(items)}</label>
                                        </li>
                                    )
                                })}
                                </ul>
                           ) : null} 
                    </div>
                    <div className={styles.filterButton}>
                        <button onClick={applyFilter}>Apply Filter</button>
                    </div>
                </section>
                    
                <section className={styles.mainContainer}>
                {searchedProducts.loading ? <div className={styles.loader}><FadeLoader color='#BC8CF2'/></div> : 
                searchedProducts.products.length === 0 ? 
                    <div className={styles.noMatch}>
                        <p><VscSearchStop/></p>
                        <p>No Match Found</p>
                        {/* <p>We couldnt find what you searched for.<p>Try searching again</p></p> */}
                    </div> 
                    : 
                    (searchedProducts.products.map((items,index) => {
                        return(
                            <div className={styles.cardBox}>
                                <img onClick={()=> navigate(`/single-product/${items.id}`)} src={items.thumbnail} alt=""></img>
                                <div className={styles.priceName}>
                                    <div>
                                        <p>{items.title}</p>
                                        <p>${items.price}</p>
                                        <p><s>{getActualPrice(items.price,items.discountPercentage)}</s></p>
                                    </div>
                                    <div className={styles.cartIcon} onClick={()=>
                                        {
                                            cartItems(items); 
                                            showToastMessage();
                                        }}>
                                        <HiShoppingCart/>
                                        <ToastContainer />
                                    </div>
                                </div>
                            </div>
                        )
                    })) } 
                </section>
            </article>
        </div>
    );
};

export default Home;