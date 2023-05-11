import React from 'react'
import Widgets from '../user/Widgets/Widgets'
import Featured from '../user/FeaturedCharts/FeaturedChart'
import Chart from './Chart/Chart'
import List from './table/Table'

const UserContainer = () => {
  return (
   
    <div className='UserContainer'>
    
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

export default UserContainer