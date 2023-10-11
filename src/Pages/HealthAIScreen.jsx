import React from 'react';
import { BsArrowRightSquareFill } from 'react-icons/bs'
const HealthAIScreen = () => {

    return (
        <div className="w-full h-full">

                <h1 className="text-4xl font-semibold text-center text-gray-400 mb-2 mt-10">HealthAI Chat</h1>


                <div className='w-full md:w-1/2 mx-auto'>
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

                <div className="fixed  bottom-5 md:left-32 flex w-full md:w-4/5 mx-auto h-14 border rounded-lg shadow-lg">
                    <input
                        type="text"
                        className="w-full rounded-l-lg  p-2 "
                        placeholder="Type your message..."
                    />
                    <button
                        className=" text-blue-500 rounded-r-lg p-1 bg-white hover:text-blue-600 focus:outline-none"
                    >
                        <BsArrowRightSquareFill className='w-full h-full' />
                    </button>
                </div>

            

              
        </div>
    );
};
export default HealthAIScreen;
