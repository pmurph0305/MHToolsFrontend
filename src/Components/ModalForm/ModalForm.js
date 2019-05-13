import React from 'react';
import './ModalForm.css'

const ModalForm = ({ onSubmitForm, onToggleModal }) => {
    return (
        <div className='form-container'>
            <form className='form-modal' onSubmit={onSubmitForm}>
                
                <div className="modal-close" onClick={onToggleModal}>
                    &times;
                </div>
                <div className='form-input-container'>
                    <label className='form-label' htmlFor="email">
                        Email:
                    </label>
                    <input
                        className='form-input'
                        type='text'
                        placeholder='email@email.com'
                        name='email'
                    />
                </div>
                <div className='form-input-container'>
                    <label className='form-label' htmlFor="password">
                        Password:
                    </label>
                    <input
                        className='form-input'
                        type='password'
                        placeholder='password'
                        name='password'
                    />
                </div>
                <input type="hidden" id="hiddenFormEl" name="hidden" value="hiddenValue"/>
                <input className='form-submit' type='submit' value='Sign in'/>
            
            </form>
        </div>
        
    )
}

export default ModalForm;