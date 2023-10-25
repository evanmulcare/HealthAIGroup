import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
    Avatar
} from '@chatscope/chat-ui-kit-react';
import Robot from '../Assets/roboto.jpeg';
import { useSelector } from 'react-redux';

const Chatbot = () => {
    const API_KEY = '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'; //CHATGPT API KEY
    
    const users = useSelector((state) => state.users.users);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const currentUserData = users.find((user) => user.docId === currentUser?.uid);
    
  
    const [thinking, setThinking] = useState(false);

    //message array, have an initial message from the chat assistant to ask a question
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
  
      //add new message to existing message array
      const newMessages = [...messages, newMessage];
  
      // Update message state
      setMessages(newMessages);
      //flag to show the thinking indicator
      setThinking(true);
  
      // Process message to ChatGPT
      await sendToChatGPT(newMessages);
    };
  
    async function sendToChatGPT(chatMessages) {

      const apiMessages = chatMessages.map((messageObject) => ({
        role: messageObject.sender === 'ChatGPT' ? 'assistant' : 'user',
        content: messageObject.message,
      }));


      //always give chatGPT the prompt tpo act as a medical assistant , giving approiate medical advice disclaimers
      const roleplayPrompt = {
        role: 'system',
        content: 'Speak like you are a medical professional giving assistance to a patient. (Give appropriate disclaimers about advice)',
      };
  
      const apiRequestBody = {
        model: 'gpt-3.5-turbo',
        messages: [roleplayPrompt, ...apiMessages],
      };
  
      try {
        //send message
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

        //update message array with ChatGPT response
        setMessages([...chatMessages, { message: chatbotResponse, sender: 'ChatGPT' }]);

        //flag disable the typing indicator
        setThinking(false);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    }
  
    return (
      <div className="w-full h-[600px]">
        <MainContainer>
          <ChatContainer>
            <MessageList>
            {/* Map through messages and display each message */}
              {messages.map((message, i) => (
                <Message key={i} model={message} sender={message.sender}>
                  <Avatar src={message.sender === 'ChatGPT' ? Robot : currentUserData?.profileimg} />
                </Message>
              ))}
            {/* Display a typing indicator while waiting for response */}
              {thinking && <TypingIndicator content="RoboDoc is Thinking" />}
            </MessageList>
            <MessageInput placeholder="Ask your medical-related question!" onSend={handleSend} attachButton={false} />
          </ChatContainer>
        </MainContainer>
      </div>
    );
  };

export default Chatbot;
