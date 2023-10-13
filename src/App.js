import './App.scss';
import { Routes, Route } from 'react-router-dom';
import UsersList from './UsersList/UsersList';
import CourseList from './CourseList/CourseList';
import { createContext } from 'react';
import { useState } from 'react';
export const AppContext = createContext();

function App() {


  const [userData, setUserData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentpage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [courseListData, setCourseListData] = useState([]);

  


  return (
    <>
      <AppContext.Provider value={{ setCourseListData, courseListData, setPostsPerPage, setCurrentpage, postsPerPage, totalPosts: userData.length, currentPage, showModal, setShowModal, userData, setUserData, modalData, setModalData }} >
        <Routes>
          <Route path='/' element={<UsersList />} />
          <Route path='/CourseList/:id' element={<CourseList />} />
          <Route path='*' element={<div> PAGE NOT FOUND</div>} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
