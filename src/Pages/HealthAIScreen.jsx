import React, { useState } from 'react';
import { BsArrowRightSquareFill } from 'react-icons/bs'
const HealthAIScreen = () => {
    const [inputText, setInputText] = useState('');
    const [chatMessages, setChatMessages] = useState([]);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const handleEnterClick = () => {
        if (inputText.trim() !== '') {
            // Add the user's message to the chatMessages array
            setChatMessages([...chatMessages, { text: inputText, type: 'user' }]);
            // Clear the input field
            setInputText('');
            // Simulate a response from AI (you can replace this with actual AI responses)
            setTimeout(() => {
                setChatMessages([...chatMessages, { text: 'AI response', type: 'ai' }]);
            }, 500);
        }
    };

    return (
        <div className="w-full h-full p-5">
            <div className="justify-center w-4/5 mx-auto items-center">
                <h1 className="text-4xl font-semibold text-center text-gray-400 mb-2">HealthAI Chat</h1>
                <div className="chat-container">
                    {chatMessages.map((message, index) => (
                        <div
                            key={index}
                            className={`${message.type === 'user' ? 'text-right' : 'text-left'
                                } mb-2`}
                        >
                            {message.text}
                        </div>
                    ))}
                </div>
                <div className=' fixed bottom-28 w-3/5 mx-auto'>
                    <div className='grid grid-cols-2 gap-2 pl-10 pr-10 mb-2'>
                        <div className='col-span-1 border  rounded-2xl'>
                            <h1 className='text-md text-gray-800 font-semibold text-left  m-2'>Summarize patient data</h1>
                            <p className='text-sm text-gray-600 font-normal text-left  m-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                        </div>
                        <div className='col-span-1 border  rounded-2xl'>
                            <h1 className='text-md text-gray-800 font-semibold text-left  m-2'>Show me high risk patients</h1>
                            <p className='text-sm text-gray-600 font-normal text-left  m-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                        </div>


                    </div>
                    <div className='grid grid-cols-2 gap-2 pl-10 pr-10'>
                        <div className='col-span-1 border  rounded-2xl'>
                            <h1 className='text-md text-gray-800 font-semibold text-left  m-2'>Some other operation 1</h1>
                            <p className='text-sm text-gray-600 font-normal text-left  m-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                        </div>
                        <div className='col-span-1 border  rounded-2xl'>
                            <h1 className='text-md text-gray-800 font-semibold text-left  m-2'>Some other operation 2</h1>
                            <p className='text-sm text-gray-600 font-normal text-left  m-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

                        </div>


                    </div>
                </div>
                <div className="flex fixed bottom-10 w-3/5 mx-auto h-14 border rounded-lg shadow-lg">

                    <input
                        type="text"
                        value={inputText}
                        onChange={handleInputChange}
                        className="w-full rounded-l-lg  p-2 "
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleEnterClick}
                        className=" text-blue-500 rounded-r-lg p-1 bg-white hover:text-blue-600 focus:outline-none"
                    >
                        <BsArrowRightSquareFill className='w-full h-full' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HealthAIScreen;
