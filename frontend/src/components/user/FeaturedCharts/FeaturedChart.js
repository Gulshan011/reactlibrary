import React from 'react'

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import {CircularProgressbar}from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"

const Featured = () => {
  return (
    <div className='featured'>
    
      <div className='top'>
        <h1 className="titles" style={{marginBottom:"450px"}}>Total work</h1>
        <FaIcons.FaTasks fontSize="small" style={{marginBottom:"450px",padding:"2px"}} />
      </div>
      <div className='bottom'>
         <div className='featuredChart'>
         <CircularProgressbar value={70} text={"70%"} strokeWidth={5}/>
         </div>
         <p className='titles1'>"Total tasks done today"</p>
         <p className='number'>400</p>
         <p className='desc'>Lots of work successfully done today . Visit @add tasks to add new tasks</p>
         <div className="summary">
         <div className="item">
           <div className="itemTitle">Target</div>
           <div className="itemResult negative">
             <FaIcons.FaSortUp fontSize="small"/>
             <div className="resultAmount">$12.4k</div>
           </div>
         </div>
         <div className="item">
           <div className="itemTitle">Last Week</div>
           <div className="itemResult positive">
             <FaIcons.FaArrowDown fontSize="small"/>
             <div className="resultAmount">$12.4k</div>
           </div>
         </div>
         <div className="item">
           <div className="itemTitle">Last Month</div>
           <div className="itemResult positive">
             <FaIcons.FaArrowDown fontSize="small"/>
             <div className="resultAmount">$12.4k</div>
           </div>
         </div>
       </div>
                </div>
    </div>
  )
}

export default Featured