import { createPortal } from 'react-dom';

const Modal = ({children}) => {
    const node = document.createElement('div');
    document.body.append(node);
    return createPortal(children, node);
};

export default Modal;