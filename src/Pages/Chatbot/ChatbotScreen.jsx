import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import ChatbotView from './ChatbotView';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Chatbot = () => {
  const { t } = useTranslation();

  const API_KEY = process.env.CHATBOT_API_KEY;

  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserData = users.find((user) => user.docId === currentUser?.uid);

  const [thinking, setThinking] = useState(false);

  // Message array, an initial message from the chat assistant to ask a question
  const [messages, setMessages] = useState([
    {
      message: t('chatbot.opener'),
      sender: 'ChatGPT',
    },
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: 'user',
      direction: 'outgoing',
    };

    // Add a new message to the existing message array
    const newMessages = [...messages, newMessage];

    // Update the message state
    setMessages(newMessages);
    // Flag to show the thinking indicator
    setThinking(true);

    // Process the message with ChatGPT
    await sendToChatGPT(newMessages);
  };

  async function sendToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => ({
      role: messageObject.sender === 'ChatGPT' ? 'assistant' : 'user',
      content: messageObject.message,
    }));
    const fewShotLearnings = [
      // Risk factors for cancer
      { role: 'system', content: 'I am an AI model and not a certified health professional, but general risk factors for cancer include aging, personal or family history of cancer, tobacco use, excessive weight (obesity), alcohol use, and exposure to radiation.' },
      
      // Symptoms of diabetes
      { role: 'system', content: 'I am an AI model and not a certified health professional, but general common symptoms of diabetes include increased thirst, frequent urination, unexplained weight loss, fatigue, blurred vision, and slow wound healing.' },
      
      // Symptoms of heart disease
      { role: 'system', content: 'I am an AI model and not a certified health professional, but general symptoms of heart disease may include chest pain or discomfort, shortness of breath, fatigue, rapid or irregular heartbeat, dizziness, and nausea. If you experience these symptoms, seek medical attention.' },
      
      // System help
      { role: 'system', content: 'You can run risk assessments for diabetes, lung cancer, and heart disease for a particular patient by navigating to the patients page, selecting your desired patient, and running an assessment under the risks tab.' },
      { role: 'system', content: 'The dashboard page lets you download the Prediction datsets used by our machine learning model for medical risk assesments, you may also download the accuracy report for each model we use from here!' },
      { role: 'system', content: 'The patients page provides you with a list of your current patients, you may search this list for a specific patient to view their details. The patients page also provides functionality to invite a new patient to be their main GP' },
      { role: 'system', content: 'The profile page allows you to view your account details and update your profile picture , email and account password.' },
      { role: 'system', content: 'Each patient has an individual patients page. this individual patients page is broken into three tabs. 1. Risk Report 2. Chat and 3. Patient Files.the  Risk Report  tab allows you to view and create risk assesments for a patient related to diabetes, lung cancer and heart disease, the chat tab lets you communicate with a patient and the Patient files tab lets you store documents relating to a particular patient' },
      { role: 'system', content: 'The healthAI page is the page you are currently on! it allows you access to me(DocBot, a helper bot for GPs and medical professionals), i can provide system help and navigation, general medical advice(disclaimer , not a medical professional), and instructions on how to run risk assesments for a patient.' },

      { role: 'system', content: 'The goal of this website is to help medical professionals run risk assesments for their patients and manage / communicate with their patients. we also provide a mobile app for patients of doctors.' }
        
    ];
    
    
    //give ChatGPT the prompt to act as a medical assistant, giving appropriate medical disclaimers
    const roleplayPrompt = {
      role: 'system',
      content: 'Speak like you are a medical professional giving assistance to a doctor. (Provide appropriate disclaimers about advice)',
    };
  
    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [roleplayPrompt, ...fewShotLearnings, ...apiMessages],
    };
  
    try {
      // Send the message
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiRequestBody),
      });
  
      const data = await response.json();
      const chatbotResponse = data.choices[0].message.content;
  
      // Update the message array with ChatGPT's response
      setMessages([...chatMessages, { message: chatbotResponse, sender: 'ChatGPT' }]);
  
      // Flag to disable the typing indicator
      setThinking(false);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  };
  

  return (
    <ChatbotView
      messages={messages}
      thinking={thinking}
      handleSend={handleSend}
      currentUserData={currentUserData}
    />
  );
};


export default Chatbot;
