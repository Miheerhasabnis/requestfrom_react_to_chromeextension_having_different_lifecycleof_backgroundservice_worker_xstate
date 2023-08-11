/*global chrome*/
import React,{useState}  from 'react';
const App = () => {
    //const [inputValue, setInputValue] = useState("click button");
    const [responses, setResponses] = useState([]);
  // const handleSendMessage = () => {
  //   // Make a simple request:
  //   // const islogin="yes";
  //   //const url='http://ip.jsontest.com/';
  //   chrome.runtime.sendMessage("ijcednfdjlpgfdpokonoikmclmombnlm", "miheer",
  //   function(response){
  //     //setInputValue(response.data);
  //     console.log("ek don tin");
  //     console.log(typeof response)
  //    alert(response);
  //   }
  //   );
  // };
  //-----------------------------------------------------------
  
  //   const handleSendMessages = async() => {
  //     // Make a simple request:
  //     for(let i=1;i<20;i++){
  //     const islogin="yes";
  //     //const url='http://ip.jsontest.com/';
  //     await chrome.runtime.sendMessage("cihfhmnpbjnfalgmekgmkajnpfgajkeo", {login:islogin,number:toString(i)},
  //     function(response){
  //       setInputValue(response.data);
  //     }
  //     );
  //   };
  // }
  

//------------------------------------------------------------

  const makeChromeRuntimeSendMessage = (message) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage("ijcednfdjlpgfdpokonoikmclmombnlm", message, function (response) {
        resolve(response);
      });
    });
  };
  
  const handleSendMessages = async () => {
    const newResponses = [];
    for(let i=0;i<3;i++){
    var response1;
    let yesorno="yes";
    let msg={link:"http://ip.jsontest.com/",islogin:yesorno}
    try {
      response1 = await makeChromeRuntimeSendMessage(msg);
      newResponses.push(response1);
      //setInputValue(response1);
      setResponses([...responses, response1]);
    }catch(error){
      console.error("Error occurred:", error);
    }
    setResponses([...responses, ...newResponses]);
  }
  };
  //--------------------------------------------------------------
  return (
    <div>
      <h1>click below buttonnnnnnn</h1>
      {/* <h1>{inputValue}</h1> */}
      <div>
        {responses.map((response, index) => (
          <div key={index}>
            <p>{response}</p>
            <h1>----|||||----</h1>
          </div>
        ))}
      </div>
      {/* <button onClick={handleSendMessage}>click for one request</button> */}
      <button onClick={handleSendMessages}>click for n num of requests</button>
    </div>
  );
};

export default App;
