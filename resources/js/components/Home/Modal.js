import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { close } from './ModalSlice'
import Authors from './Authors'
function Modal() {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal)

    return <div>{modal.isOpen && (
        <div className={"modal fade  bd-example-modal-lg " + (modal.isOpen ? 'show' : '')} style={{ display: modal.isOpen ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.75)' }} id="exampleModal" tabIndex="-1" role="dialog" >
            <div className="modal-dialog" role="document" style={{ maxWidth: '800px' }}>
                <div className="modal-content">
                    <div className="modal-header d-flex justify-content-between">
                        <div className='modal-title'>

                            Book Details
                        </div>
                        <button onClick={() => dispatch(close())} type="button" className="close" aria-label="Close">
                            <span>&times;</span>
                        </button>

                    </div>
                    <div className="modal-body">
                        {true == modal.isLoading && <div className='text-center d-flex justify-content-center align-items-center'>
                            <div className="spinner-grow" role="status"></div>
                            <div className='ml-8'>Loading...</div>
                        </div>}
                        {false == modal.isLoading && '' == modal.error && <div className='row'>
                            <div className="col-md-4">
                                <img src={"/api/books/" + modal.product.id + "/image"} alt={modal.product.title} />
                                <div className="pricing">

                                    {modal.pricing.prices.print && <div className='print'>
                                        <div className='type'>Print</div>
                                        <div className='price'>₹ {modal.pricing.prices.print.INR}</div>
                                    </div>}
                                    {modal.pricing.prices.ebook && <div className='ebook'>
                                        <div className='type'>Ebook</div>
                                        <div className='price'>₹ {modal.pricing.prices.ebook.INR}</div>
                                    </div>}
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="display-6">{modal.product.title}</div>
                                <div className="">{modal.product.tagline}</div>
                                <div className='authors mt-4'>{Authors({ authors: modal.product.authors })}</div>
                                <div className='published mb-4'> <b>Publication Date</b>: {modal.product.publication_date.replace('T00:00:00.000Z', '')}  | <b>Pages</b>: {modal.product.pages}</div>
                                <strong>Learn</strong>
                                {modal.product.learn && <div className='learn' dangerouslySetInnerHTML={{ __html: modal.product.learn }} ></div>}
                                <strong>Features</strong>
                                {modal.product.features && <div className='features' dangerouslySetInnerHTML={{ __html: modal.product.features }}></div>}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )}</div>
}

export default Modal