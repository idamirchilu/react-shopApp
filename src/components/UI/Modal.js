import classes from './Modal.module.css';
import { createPortal } from 'react-dom'
import { Fragment,useContext } from 'react';
import CartContext from '../../context/Cart-context';


const Backdrop = () => {
  const ctx = useContext(CartContext);
  return <div className={classes.backdrop} onClick={ctx.overlayCloseHandler}/>
};

const ModalOverlay = props => {
  return <div className={classes.modal}>
    <div className={classes.content}>{props.children}</div>
  </div>
};

const portalElement = document.getElementById('overlays');

const Modal = props => {
  return(
    <Fragment>
    {createPortal(<Backdrop/>,portalElement)}
    {createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </Fragment>
  )
};

export default Modal;