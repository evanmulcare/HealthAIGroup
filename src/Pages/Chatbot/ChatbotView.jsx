import React from 'react'
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
import Robot from '../../Assets/roboto.jpeg';

const ChatbotView = ({ messages, thinking, handleSend, currentUserData }) => {

    return (
        <div data-testid="chatbot-1" className="w-full h-[600px]">
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        {messages.map((message, i) => (
                            <Message key={i} model={message} sender={message.sender}>
                                <Avatar src={message.sender === 'ChatGPT' ? Robot : currentUserData?.profileimg} />
                            </Message>
                        ))}
                        {thinking && <TypingIndicator content="RoboDoc is Thinking" />}
                    </MessageList>
                    <MessageInput placeholder="Ask your medical-related question!" onSend={handleSend} attachButton={false} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};

export default ChatbotView;