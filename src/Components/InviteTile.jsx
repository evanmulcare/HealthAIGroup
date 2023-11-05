import React, { useRef } from 'react';

const InviteTile = ({ id, name }) => {
  const tileRef = useRef(null);

  return (
    <div className="rounded-lg w-full h-full border shadow-lg p-4 bg-white" ref={tileRef}>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center">
          <div className="text-xl font-semibold text-gray-800">
            <div className="text-left">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-left">
                {name}
              </h2>
              <h3 className="text-sm text-gray-500 md:text-gray-400">ID: {id}</h3>
            </div>
          </div>
        </div>
        <div className="space-x-2">
          <button
            // Find a way to make button red.
            className="px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
            onClick={() => {/* DELETE OUTGOING INVITE FUNCTION HERE */}}
          >
            <h3 className="text-sm">Cancel</h3>
          </button>
        </div>
      </div>
    </div>
  )
}

export default InviteTile