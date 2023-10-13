import React, { useContext } from 'react';
import "./Pagination.scss";
import {AppContext} from "../../App.js"

function Pagination() {

  const {postsPerPage, totalPosts, currentPage, setCurrentpage} = useContext(AppContext);

  const paginate = (pageNumber) => {
    setCurrentpage(pageNumber)
}

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <nav>
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group mr-2" role="group" aria-label="First group">
        {
          pageNumbers.map(number => {
            return (
              <>
      
                    <button onClick={() => paginate(number)} type="button" className={currentPage == number ? "btn btn-secondary"  : "btn btn-outline-secondary"}>
                       {number}
                    </button> 
              </>
            )
          })
        }
        </div>
      </div>
    </nav>
  )
}

export default Pagination;