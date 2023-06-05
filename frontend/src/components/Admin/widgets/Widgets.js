
import React,{useState, useEffect} from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import "./widgets.css";

const Widgets = ({type}) => {
  const [bookList, setBookList] = useState([]);
  const [registerList, setRegisterList] = useState([]);
  const [totalIssuedBooks, setTotalIssuedBooks] = useState(0);
  const [totalRegistered, setTotalRegistered] = useState(0);
  useEffect(() => {
    async function fetchBookList() {
      try {
        const response = await fetch('http://localhost:8081/api/v1/auth/booklist');
        const data = await response.json();
        setBookList(data.data);
        setTotalIssuedBooks(data.data.length);
      } catch (error) {
        console.error(error);
      }
    }
    if (type === 'status') {
      fetchBookList();
    }
  }, [type]);


  useEffect(() => {
    async function fetchRegisterList() {
      try {
        const response = await fetch('http://localhost:8081/api/v1/auth/registerlist');
        const data = await response.json();
        setRegisterList(data.data);
        setTotalRegistered(data.data.length);
      } catch (error) {
        console.error(error);
      }
    }
    if (type === 'user') {
      fetchRegisterList();
    }
  }, [type]);

  
  let data;
 switch(type){
    case "user":
        data={
            title:"USERS",
             total:totalRegistered,
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
            total: totalIssuedBooks,
            link:"See updates",
            icon:<AiIcons.AiOutlineHistory/>,
        };
        break;
  }
 
  return (
    <div className="widget" >
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
      
        <span className="icon">{data.icon}</span> 
      </div>

  );
};

export default Widgets;
