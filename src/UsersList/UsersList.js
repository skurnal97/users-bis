import React, { useEffect, useContext} from 'react';
import "./UsersList.scss";
import Header from './Header/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditModal from '../EditModal/EditModal';
import Pagination from './Pagination/Pagination';
import { AppContext } from '../App';
// import { useParams } from 'react-router-dom';

function UsersList() {
    const {userData, setUserData, showModal, setShowModal, setModalData, currentPage, postsPerPage } = useContext(AppContext);

    const indexOfLastUser =  currentPage * postsPerPage; 
    const lastIndexOfFirstPosts = indexOfLastUser - postsPerPage;
    const currentPosts = userData.slice(lastIndexOfFirstPosts, indexOfLastUser)
    // console.log(currentPosts)

    const navigate = useNavigate();

    const getDataUrl = "https://pre.bistrainer.com/v1/index.cfm?action=testapi.users";

    const getUserData = async () => {
        const response = await axios.get(getDataUrl);
        //   console.log(response.data.users);
        if (response.data.success == true) {
            console.log(response.data.users);
            setUserData(response.data.users)
            
            // console.log(response.data.users)
        }
    }

    useEffect(() => {
        getUserData()
        // console.log(userData)
        // console.log(userData)
    }, [])


    const coursesClickHandler = (courseId) => {
        navigate(`/CourseList/${courseId}`)
    }

    const editClickHandler = (eachUserObj) => {
        setShowModal(!showModal)
        setModalData({
            "role": eachUserObj.role,
            "city": eachUserObj.city,
            "address": eachUserObj.address,
            "phone": eachUserObj.phone,
            "username": eachUserObj.username,
            "id": eachUserObj.id,
            "email": eachUserObj.email,
            "name": eachUserObj.name
        })
    }


    return (
        <>
            <div className='userlist-container' >
                <Header />
                <div className='userlist-container__table' >
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>USERNAME</th>
                                <th>NAME</th>
                                <th>PHONE</th>
                                <th>ADDRESS</th>
                                <th>EMAIL</th>
                                <th>CITY</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentPosts.map((eachUserObj) => {
                                    return (
                                        <tr>
                                            <td>{eachUserObj.id}</td>
                                            <td>{eachUserObj.username}</td>
                                            <td>{eachUserObj.name}</td>
                                            <td>{eachUserObj.phone}</td>
                                            <td>{eachUserObj.address}</td>
                                            <td>{eachUserObj.email}</td>
                                            <td>{eachUserObj.city}</td>
                                            <td>
                                                <button type="button" class="btn btn-outline-dark" onClick={() => editClickHandler(eachUserObj)} >
                                                    EDIT
                                                </button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-outline-dark" onClick={() => coursesClickHandler(eachUserObj.id)} >
                                                    COURSES
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <Pagination />
                <EditModal />
            </div>
        </>
    )
}

export default UsersList;