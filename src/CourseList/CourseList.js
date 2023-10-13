import React, { useContext, useEffect } from 'react';
import "./CourseList.scss";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header/Header";
import { AppContext } from '../App';


function CourseList() {
  const {setCourseListData, courseListData} = useContext(AppContext); 

  const navigate = useNavigate();

  const params = useParams();
  const getCoursesUrl = "https://pre.bistrainer.com/v1/index.cfm?action=testapi.courses&id="

  const getCourses = async () => {
    const response = await axios.get(getCoursesUrl + params.id)
    // console.log(response.data)
    if (response.data.success == true) {
      setCourseListData(response.data.classes)
    }
  }

  const backClickHandler = () => {
    navigate("/")
  }

  useEffect(() => {
    getCourses()
    // console.log(courseListData)
  }, [])

  return (
    <div className='courselist-container'>
      <div className='courselist-container__head' >
        <Header />
        <button className='back-btn' onClick={() => backClickHandler()} >
          <i class="fa-solid fa-backward"> &nbsp; BACK </i>
        </button>
      </div>
      <div className='courselist-container__table'>
        <table class="table table-dark table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Code</th>
              <th>Class Name</th>
              <th>Marks</th>
              <th>Pass Marks</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {
              courseListData.map((eachCourseDataObj) => {
                return (
                  <tr>
                    <td>{eachCourseDataObj.classid}</td>
                    <td>{eachCourseDataObj.classcode}</td>
                    <td>{eachCourseDataObj.classname}</td>
                    <td>{eachCourseDataObj.marks}</td>
                    <td>{eachCourseDataObj.passmarks}</td>
                    <td>{eachCourseDataObj.certificate}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CourseList;