import React from 'react'
import Widgets from './widgets/Widgets'
import Featured from './Featuredchart/Featured'
import Chart from './Chart/Chart'
import List from './table/Table'
import './widgets/widgets.css'
const AdminContainer = () => {
  return (
   
    <div className='AdminContainer'>
    
    <div className='widgets'>
    <Widgets type="user"/>
    <Widgets type="books"/>
    <Widgets type="status"/> </div>
    <div className='charts'>
        <Featured />
        <Chart/>

    </div>
    <div className='listContainer'>
       <div className="listTitle">Latest issues</div>
        <List/>
       </div>
   
       
        </div>
        
  )
}

export default AdminContainer