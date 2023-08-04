/*global chrome*/
import React , { useState } from 'react';
const App = () => {
    const [inputValue, setInputValue] = useState("click button");
  const handleSendMessage = () => {
    // Make a simple request:
    const islogin="yes";
    //const url='http://ip.jsontest.com/';
    chrome.runtime.sendMessage("cihfhmnpbjnfalgmekgmkajnpfgajkeo", {login:islogin},
    function(response){
      setInputValue(response.data);
      alert("see console bro");
    }
    );
  };
  // const handleSendMessages = async() => {
  //   // Make a simple request:
  //   var time;
  //   var second;
  //   const islogin="yes";
  //   //const url='http://ip.jsontest.com/';
  //   await chrome.runtime.sendMessage("cihfhmnpbjnfalgmekgmkajnpfgajkeo", {login:islogin,number:"one"},
  //   function(response){
  //     setInputValue(response.data);
  //      time=new Date();
  //      second=time.getSeconds();
  //     alert(`see console bro from double request,${second}`);
  //   }
  //   );
  //   await chrome.runtime.sendMessage("cihfhmnpbjnfalgmekgmkajnpfgajkeo", {login:islogin,number:"two"},
  //   function(response){
  //     setInputValue(response.data);
  //     time=new Date();
  //     second=time.getSeconds();
  //     alert(`see console bro from double request,${second}`);
  //   }
  //   );
  // };



  const makeChromeRuntimeSendMessage = (message) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage("cihfhmnpbjnfalgmekgmkajnpfgajkeo", message, function (response) {
        resolve(response.data);
      });
    });
  };
  
  const handleSendMessages = async () => {
    const islogin = "yes";
    try {
      const response1 = await makeChromeRuntimeSendMessage({ login: islogin, number: "request one" });
      setInputValue(response1);
      const time1 = new Date();
      const second1 = time1.getSeconds();
      alert(`First request done, ${second1}`);
  
      const response2 = await makeChromeRuntimeSendMessage({ login: islogin, number: "request two" });
      setInputValue(response2);
      const time2 = new Date();
      const second2 = time2.getSeconds();
      alert(`Second request done, ${second2}`);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  
 
  return (
    <div>
      <h1>click below buttonnnnnnn</h1>
      <h1>{inputValue}</h1>
      <button onClick={handleSendMessage}>click for one request</button>
      <button onClick={handleSendMessages}>click for two request</button>
    </div>
  );
};

export default App;
