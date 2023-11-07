import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import ChatbotView from './ChatbotView';
import { useSelector } from 'react-redux';

const Chatbot = () => {
  const API_KEY = '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'; // CHATGPT API KEY

  const users = useSelector((state) => state.users.users);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const currentUserData = users.find((user) => user.docId === currentUser?.uid);

  const [thinking, setThinking] = useState(false);

  // Message array, an initial message from the chat assistant to ask a question
  const [messages, setMessages] = useState([
    {
      message: "Hey there, I am a medical assistant powered by ChatGPT. Ask me some questions!",
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

    // Always give ChatGPT the prompt to act as a medical assistant, giving appropriate medical advice disclaimers
    const roleplayPrompt = {
      role: 'system',
      content: 'Speak like you are a medical professional giving assistance to a doctor. (Give appropriate disclaimers about advice)',
    };

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [roleplayPrompt, ...apiMessages],
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
