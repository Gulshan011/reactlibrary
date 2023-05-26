
// import { co } from '@fullcalendar/core/internal-common';
// import React from 'react';
// import Sidebar from "./Sidebar";


// function ChatBotWidget() {
 

//   return (
//     <div>
//     <Sidebar/>
//     <div className='home-page'>
 
//     <iframe style={{borderRadius:"20px"}}allow="microphone 'src'" src="https://www.botlibre.com/chat?&id=47626293&embedded=true&chatLog=true&facebookLogin=false&application=8782902681884078890&bubble=true&menubar=true&chooseLanguage=true&sendImage=true&background=%23fff&prompt=You+say&send=&css=https://www.botlibre.com/css/social_chat.css&language=en" width="700" height="550" frameborder="0" scrolling="auto"> <style>

//     #menubar {
//       color: #f1f1f1;
//       color: #333;
//       font-size: 16px;
//       padding: 10px;
//     }
//   </style></iframe>
     
//     </div></div>
//   );
// }

// export default ChatBotWidget;
import React from 'react';
import Sidebar from "./Sidebar";

function ChatBotWidget() {
  return (
    <div>
      <Sidebar />
      <div className='home-page'>
        <iframe
          style={{ borderRadius: "30px" }}
          allow="microphone 'src'"
          src="https://www.botlibre.com/chat?&id=47626293&embedded=true&chatLog=true&facebookLogin=false&application=8782902681884078890&bubble=true&menubar=true&chooseLanguage=true&sendImage=true&background=%23fff&prompt=You+say&send=&css=https://www.botlibre.com/css/social_chat.css&language=en"
          width="800"
          height="650"
          frameborder="5px solid black"
          scrolling="auto"
         
        ></iframe>
      </div>
    </div>
  );
}

export default ChatBotWidget;
