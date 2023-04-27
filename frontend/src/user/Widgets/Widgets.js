import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./Widgets.css";

const Widgets = ({type}) => {
let data;
// eslint-disable-next-line
switch(type){
    case "user":
        data={
            title:"USERS",
             total:620,
             link:"See all users",
             icon:<AiIcons.AiFillProfile/>,
        };
        break;
        case "books":
            data={
                title:"BOOKS",
                 total:800,
                 link:"See all books",
                 icon:<AiIcons.AiFillBook/>,
            };
            break;
            case "status":
                data={
                    title:"ISSUED BOOKS",
                     total:300,
                     link:"See updates",
                     icon:<AiIcons.AiOutlineHistory/>,
                };
                break;
    
}
return (
    <div className="widget">
      <div className="left">
        <div>
          <span className="title">{data.title}</span>
        </div>
        <div>
          
          <span className="total">{data.total}</span>
        </div>
        <div>
          
          <span className="links">{data.link}</span>
        </div>
      </div>
      <div className="right">
        <div className="percentage positive" >
          <FaIcons.FaArrowUp />
          20%
        </div>

        <span className="icon">{data.icon}</span> 
      </div>
    </div>
  );
};

export default Widgets;
