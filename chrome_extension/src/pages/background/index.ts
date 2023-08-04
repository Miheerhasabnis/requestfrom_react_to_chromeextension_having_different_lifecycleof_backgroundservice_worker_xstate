import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
reloadOnUpdate("pages/background");
console.log("background loaded ");
//----------------------------------------------------------->

import { createMachine, interpret } from 'xstate';
import { fromEvent } from 'rxjs';
 function fetchdata() {
  return new Promise(async(resolve)=>{
    await fetch('http://ip.jsontest.com/', {
      method: 'GET',
    }).then(res => {
     
      return res.json();
    }).then(res => {
      resolve(res);
    }).catch((err)=>{
      console.log("error bro",err);
    })     
  })
}
const serviceWorkerMachine = createMachine({
  id: 'serviceWorker',
  initial: 'registered',
  context: {
    inputValue: 'no ip',
  },
  states: {
    registered: {
      on: {
        INSTALL: 'installed',
        
      },
    },
    installed: {
      on: {
        ACTIVATE: 'activated',
        LOGIN:'login'
      },
    },
    activated: {
      on: {
        LOGIN: 'login',
      },
    },
    login: {
     on:{
      DATA:'data',
     }
    },
    data:{
      invoke: {
        src: 'fetchdata',
        onDone: {
          target:'activated',
          actions: 'setInputValue',
        },
        onError: 'activated',
      },
      on:{
        TERMINATE:'termination',
       }
        },
    termination:{

      }
     },
   },
   
   {
    actions:{ 
      setInputValue:(context,event)=>{
        console.log("data fetched")
        context.inputValue=event.data.ip;
      }
    },
    services:{
      //servicse begin
      fetchdata:fetchdata,
      //service end
     }
   }
);
// Usage
const serviceWorkerService = interpret(serviceWorkerMachine).start();
 serviceWorkerService.onTransition((state) => {
    console.log('Current State from xstate:', state.value);
    if(state.value==='termination'){
      console.log("inside termination state")
     
    }
   });
// Use RxJS fromEvent to create observables for the 'install', 'activate', and 'message' events
fromEvent(self, 'install').subscribe((event) => {
  //console.log(`service worker state now:---> ${event.type}`);
  serviceWorkerService.send('INSTALL');
});
fromEvent(self, 'activate').subscribe((event) => {
  //console.log(`service worker state now:---> ${event.type}`);
  serviceWorkerService.send('ACTIVATE');
});

//------------------------------------------------------->
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse){
        serviceWorkerService.send('LOGIN');      
      if(request.login==="yes"){
        console.log(request.number)
         serviceWorkerService.send('DATA');    
         sendResponse({data:"ok data sent see console.log of background"});
      }
      else{
        sendResponse({data:"sorry first login"});
      }    
});

chrome.runtime.onSuspend.addListener(async () => {
  console.log("terminated")
});




