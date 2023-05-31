



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
          src="https://www.botlibre.com/chat?&id=47626293&embedded=true&chatLog=true&facebookLogin=false&application=8782902681884078890&bubble=true&menubar=true&chooseLanguage=true&sendImage=true&background=%23fff&prompt=You+say&send=&css=https://www.botlibre.com/css/blue_chat.css&language=en"
          width="900"
          height="750"
          frameborder="5px solid black"
          scrolling="auto"
         
        ></iframe>
      </div>
    </div>
  );
}

export default ChatBotWidget;
