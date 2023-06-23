import React from 'react'
import ReactDOM, { createPortal } from 'react-dom'

const Modal = (props) => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className='fixed px-2 top-0 left-0 w-full h-full bg-slate-600/60 backdrop-blur-sm flex justify-center items-center'>
            <div onClick={(e) => e.stopPropagation()} className='w-[400px] bg-white text-gray-800 py-6 rounded-sm'>
                <h3 className='text-lg font-bold pb-3 px-6'>{props.title}</h3>
                <p className='py-3 px-6 mb-3 border-t border-b border-slate-200'>{props.message}</p>
                <div className='flex items-center gap-4 px-6'>
                    {props.actions}
                </div>
                    
            </div>
        </div>, document.querySelector('#modal')
    )
}

export default Modal;

