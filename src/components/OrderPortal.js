import React,{Component} from 'react';
import  ReactDom  from 'react-dom';
import styles from "./orderPortal.module.scss";
import {AiFillCheckCircle} from 'react-icons/ai';
import {RxCross1} from 'react-icons/rx';
import withRouter from '../props/navigate';

class OrderPortal extends Component {

    render(){

        if(!this.props.open) return  null

        return ReactDom.createPortal(
            <>
                <div className={styles.overLay}/>
                <div className={styles.modal}>
                    <RxCross1 className={styles.cross} onClick={()=>{
                        const { navigate } = this.props;
                        navigate("/");
                        }}/>
                    <p>Order Placed Successfully</p>
                    <AiFillCheckCircle className={styles.check}/>
                </div>
            </>,
            document.getElementById('portal')
        )
    }
}

export default withRouter(OrderPortal);