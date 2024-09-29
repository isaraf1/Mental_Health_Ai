import React from 'react'
// import { useState } from 'react'
// import './App.css'
import ChatBot from 'react-chatbotify'
import { GoogleGenerativeAI } from "@google/generative-ai";
import GEMINI_API_KEY from "../../../gemini.env"

export default function finBot() {
//   const [count, setCount] = useState(0)
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  async function run(message) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
    const prompt ="There are 3 queries based on a given message, please answer all 3 separating yours answers with a ||| . Please process the following message:"+message+" Firstly, answer whether or not this question is related to mental health in either yes or no. Secondly, provide a response to the query relevant to India asked in the message and limit to 100 words. Thirdly put tags based on the content of the message. for example: #depression #anxiety.";
    const result = await model.generateContent(prompt);
    const response = await result.response;

    
    const text = response.text();
    var resList=text;
    resList=resList.split("|||")
    var confirm;
    var ans;
    var tags;

    console.log(resList);

    if(resList.length===4){
      confirm=resList[1];
      ans=resList[2];
      tags=resList[3];
    }
    else if(resList.length===3){
      confirm=resList[0];
      ans=resList[1];
      tags=resList[2];
    }
    else{
      return "Please type something related to mental health";
    }

    if(confirm.includes("Yes")){
      return ans;
    }

    return "Please type something related to mental health";
  }
    const flow = {
      start: {
        message: "Hello I am TIET_BOT,I'm here to assist you with any information related to your mental health queries. Let me know if you need anything :)",
        path: "loop"
      },
          loop: {
              message: (params) => run(params.userInput),
              path: "loop"
          },
    }
  return (
    <>
    <div>
          <ChatBot flow={flow}/>
    </div>
    </>
  )
}
