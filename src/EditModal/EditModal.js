import {React} from 'react';
import "./EditModal.scss";
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useContext} from 'react';
import { AppContext } from '../App';

function EditModal() {

    const {showModal, setShowModal,userData, setUserData, modalData, setModalData} = useContext(AppContext)

    const handleClose = () => {
        setShowModal(!showModal)
    }


    const saveChangesClickhandler = () => {
        handleClose()
        setUserData(
            userData.map((newUserObj) => {
                if(newUserObj.id ==  modalData.id){
                    return(
                        modalData
                    )
                }
                return newUserObj
            })
        )
    }

    const inputChangehandler = (key, value) => {
        setModalData({
            ...modalData, 
            [key]: value
        })
    }

    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        EDIT USER DATA
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className='label-input-container' >
                            <label>ID</label>
                            <input type='number' value={modalData.id} disabled/>
                        </div>
                        <div className='label-input-container'>
                            <label>USERNAME</label>
                            <input value={modalData.username} type='text' disabled/>
                        </div>
                        <div className='label-input-container'>
                            <label>NAME</label>
                            <input value={modalData.name} type='text' disabled/>
                        </div>
                        <div className='label-input-container'>
                            <label>PHONE</label>
                            <input value={modalData.phone} onChange={(e) => inputChangehandler("phone", e.target.value)} />
                        </div>
                        <div className='label-input-container'>
                            <label>ADDRESS</label>
                            <input value={modalData.address} type='text' onChange={(e) => inputChangehandler("address", e.target.value)}/>
                        </div>
                        <div className='label-input-container'>
                            <label for="email" >EMAIL</label>
                            <input value={modalData.email} type='email' onChange={(e) => inputChangehandler("email",e.target.value)}/>
                        </div>
                        <div className='label-input-container'>
                            <label>CITY</label>
                            <input value={modalData.city} type='text' onChange={(e) => inputChangehandler("city", e.target.value)} />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => saveChangesClickhandler()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditModal;