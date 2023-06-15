
import {React ,useState}from 'react';
import Chatbot from 'react-simple-chatbot';
import { Segment } from 'semantic-ui-react';
import {Icon} from 'semantic-ui-react'
import * as FaIcons from "react-icons/fa";
import'./chatbot.css'
import * as AiIcons from "react-icons/ai";
function ChatbotComponent() {
  const [showChatbot, setShowChatbot] = useState(false);

  const handleIconClick = () => {
    setShowChatbot(true);
  };
  
  const handleCancel = () => {
    setShowChatbot(false);
  };
  
  const steps = [
    {
      id: 'Greet',
      message: 'Hello, welcome to E-Library',
      trigger: 'Ask Name'
    },
    {
      id: 'Ask Name',
      message: 'Please enter your name',
      trigger: 'Waiting1'
    },
    {
      id: 'Waiting1',
      user: true,
      trigger: 'Name'
    },
    {
      id: 'Name',
      message: 'Hi {previousValue}, please select anyone to know more ',
      trigger: 'Issues'
    },
    {
      id: 'Issues',
      options: [
        {value:'About EU',label:'About EU',trigger:'About EU'},
        {value:'Admission Enquiry',label:'Admission Enquiry',trigger:'Admission Enquiry'},
        { value: 'Contact Details', label: 'Contact Details', trigger: 'Contact Details' },
        { value: 'Add Task', label: 'Add Task', trigger: 'Add Task' },
        { value: 'IssuedHistory', label: 'IssuedHistory', trigger: 'IssuedHistory'},
        { value: 'Live Chat', label: 'Live Chat', trigger: 'Live Chat' },
        { value: 'Leave a meesage', label: 'Leave a meesage', trigger: 'Leave a meesage' },
      ],
      trigger:'defaultmessage',
     
    },
  
    {
      id: 'About EU',
      options: [
        {value:'Foundation',label:'Foundation',trigger:'Foundation'},
        {value:'Student Strength',label:'Student Strength',trigger:'Student Strength'},
        { value: 'Accredation', label: 'Accredation', trigger: 'Accredation' },
        { value: 'Ranking', label: 'Ranking', trigger: 'Ranking' },
        { value: 'Corporate Office', label: 'Corporate Office', trigger: 'Corporate Office' },
        { value: 'Address', label: 'Address', trigger: 'Address' },
        { value: 'Why EU', label: 'Why EU', trigger: 'Why EU' },
      ],
    },
   
    {
      id: 'Foundation',
      message: 'Eternal university is  established under the Himachal Pradesh Private University (Establishment & Regulation) Act 2006 & Himachal Pradesh Government Act.no. 3 of 2009, with the right to confer degree as per the UGC public notice on private Universities dated April 18, 2011.The great visionary of 20th century (Sant Attar Singh Ji) had a vision that modern scientific education alone will not serve the humanity well, until and unless it is amalgamated with Braham Vidya (Spiritual Education).  ',
      end: true
    },
    {
      id: 'Student Strength',
      message: 'According , to latest data being updated more than 22000 girls are studying in EU Campus',
      end: true
    },
    {
      id: 'Accredation',
      message: 'Eternal university is NAAC Accredited & ISO 9001: 2015. The university is Recognised by UGC | AICTE | INC | NCTE | DISR | DBT | DRDO.',
      end: true
    },
    {
      id: 'Ranking',
      message: 'Eternal University, Baru Sahib, Himachal Pradesh has secured 401-600 overall rank globally in the Times Higher Education Impact Rankings 2022 amongst 1115 institutions from 94 countries. Eternal University has ranked 15 th among the Indian Universities. The Universities worldwide has been assessed against the United Nations Sustainable Development Goals (SDGs). United Nations has laid down 17 SDGs as parameters on which the Universities have been ranked based on their efforts to achieve these SDGs.',
      end: true
    },
   
    {
      id: 'Corporate Office',
      options:[
        {value:'Email',label:'Email',trigger:'Email'},
        {value:'Phone',label:'Phone',trigger:'Phone'},
      ]
     },
   {
    id:'Email',
    message:'You can reach us at contact@eternaluniversity.edu.in ',
    end:true
   },
   {
    id:'Phone',
    message:'Contact us on (91) 9805098724',
    end:true
   },
   
    {
      id: 'Address',
     
      message: 'Baru Sahib, Distt, near Rajgarh, Himachal Pradesh 173101',
      end: true,
    
      waitAction: true,
      trigger: 'Address'
      
  
    },
    {
      id: 'Why EU',
      component: (
        <div>
          <p>Eternal university is NAAC Accredited & ISO 9001: 2015. The university is Recognised by UGC | AICTE | INC | NCTE | DISR | DBT | DRDO.</p>
          <a href="https://www.eternaluniversity.edu.in/">Eternal Info</a>
        </div>
      ),
      end: true
    },
   
   {
      id: 'Admission Enquiry',
      component: (
        <div>
          <p>Please fill out the form to know more...</p>
          <a href="https://eternaluniversity.edu.in/NewRegistration">Admission Enquiry Form</a>
        </div>
      ),
      end: true
    },
    {
      id: 'Contact Details',
      options:[
        {value:'Email',label:'Email',trigger:'Email'},
        {value:'Phone',label:'Phone',trigger:'Phone'},
      ]
     },
   {
    id:'Email',
    message:'You can reach us at contact @eternaluniversity.edu.in ',
    end:true
   },
   {
    id:'Phone',
    message:'Contact us on (91) 9805098724',
    end:true
   },

    {
      id: 'Add Task',
      message: 'Visit my task page in the library portal to know more about this ',
      end: true
    },
    {
      id: 'IssuedHistory',
      message: 'THe history of books issued by you is at history page ;Check it out ',
      end: true
    },


    {
      id: 'Live Chat',
      message: 'For better experience ; just visit Chat page for our live Chat experience',
      end: true
    },
    {
      id: 'Leave a meesage',
      message: 'KIndly check out Query page to  post your queries ; will be overwhelmed to recieve your responses ',
      end: true
    },
  
  {
  id:'defaultmessage',
  message :'I currently do not have the information on this! But, thank you for writing to us. For detailed information regarding your query, kindly call our dedicated 24*7 helpline at 1800121288800.',
trigger:'byee'
  },
  {
  id:"byee",
  message:"Byee ,good to see you again",
  end :true
  }
];
  return (
    <>
      {showChatbot && (
        <Segment style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
          <AiIcons.AiOutlineClose name="cancel" size="30px" color="white" onClick={handleCancel} />
          <Chatbot steps={steps} />
        </Segment>
      )}
  
      <Segment
      className="chatbot-icon "style={{zIndex:999}} // Add a class for styling and animation
      onClick={handleIconClick}
    >
      <AiIcons.AiFillWechat name="chat" size="100px" color="yellow" />
    </Segment>
    </>
  );
}

export default ChatbotComponent;
