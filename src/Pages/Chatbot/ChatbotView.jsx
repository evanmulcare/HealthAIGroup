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
import { useTranslation } from 'react-i18next';

const ChatbotView = ({ messages, thinking, handleSend, currentUserData }) => {
    const { t } = useTranslation();

    return (
        <div  className="w-full h-[600px]">
            <MainContainer>
                <ChatContainer>
                    <MessageList>
                        {messages.map((message, i) => (
                            <Message key={i} model={message} sender={message.sender}>
                                <Avatar src={message.sender === 'ChatGPT' ? Robot : currentUserData?.profileimg} />
                            </Message>
                        ))}
                        {thinking && <TypingIndicator content={t('chatbot.thinking')} />}
                    </MessageList>
                    <MessageInput placeholder={t('chatbot.placeholder')} onSend={handleSend} attachButton={false} />
                </ChatContainer>
            </MainContainer>
        </div>
    );
};

export default ChatbotView;