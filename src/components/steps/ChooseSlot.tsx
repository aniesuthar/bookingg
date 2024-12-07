import React from 'react'
import { FormActionProps } from '../AppointmentBook'

export default function ChooseSlot({handleNext, handlePrev}: FormActionProps) {
  return (
    <div className="flex flex-col p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold ">Step 3: Choose Slot</h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                className="py-3 px-6 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                onClick={() => handleNext?.({ slot: '12:30 PM' })}
              >
                12:30 PM
              </button>
              <button
                className="py-3 px-6 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                onClick={() => handleNext?.({ slot: '1:00 PM' })}
              >
                1:00 PM
              </button>
              <button
                className="py-3 px-6 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                onClick={() => handleNext?.({ slot: '1:30 PM' })}
              >
                1:30 PM
              </button>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg"
                onClick={handlePrev}
              >
                Back
              </button>
            </div>
          </div>
  )
}
