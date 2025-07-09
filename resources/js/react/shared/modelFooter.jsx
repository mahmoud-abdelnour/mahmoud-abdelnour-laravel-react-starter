import React from 'react';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getFormattedMessage, placeholderText } from "./sharedMethod";
import { connect, useDispatch } from "react-redux";

const ModelFooter = ( props ) => {
    const { onEditRecord, onSubmit,isSaving, editDisabled, addDisabled, link, ref } = props;
    
    return (
        <>
            {
                link ? 
                <div className='d-flex mt-5 justify-content-end'>
                    

                    {onEditRecord ?
                        <button onClick={( event ) => onSubmit( event )} className='btn btn-primary me-3' type='submit'
                            disabled={editDisabled || isSaving} ref={ref}>
                            {isSaving ? placeholderText( "globally-saving-btn-label" ) : placeholderText( "globally.save-btn" )}
                            
                            {isSaving ? 
                                <div>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            : ""}
                        </button>
                        :
                        <button onClick={( event ) => onSubmit( event )} className='btn btn-primary me-3' type='submit'
                            disabled={addDisabled || isSaving} ref={ref}>
                            {isSaving ? placeholderText( "globally-saving-btn-label" ) : placeholderText( "globally.save-btn" )}

                            {isSaving ? 
                                <div>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            : ""}
                        </button>
                    }

              
                            <Link to={link}
                                className='btn btn-secondary'>
                                {getFormattedMessage( "globally.cancel-btn" )}
                            </Link>
                       
                    
                </div> :

                <Modal.Footer children='justify-content-start' className='pt-0'>
                    {onEditRecord ?
                        <button onClick={( event ) => onSubmit( event )} className='btn btn-primary me-2' type='submit'
                            disabled={editDisabled}>
                            {placeholderText( "globally.save-btn" )}

                            {isSaving ? 
                                <div>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            : ""}
                        </button> :
                        <button onClick={( event ) => onSubmit( event )} className='btn btn-primary me-2' type='submit'
                            disabled={addDisabled}>
                            {placeholderText( "globally.save-btn" )}
                            {isSaving ? 
                                <div>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            : ""}
                        </button>
                    }
                    
                </Modal.Footer>
                
            }
        </>
    )
};

const mapStateToProps = (state) => {
    const { isSaving } = state;
    return { isSaving };
};

export default connect(mapStateToProps, )(ModelFooter);

