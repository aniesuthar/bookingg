import React from 'react'
import { FormActionProps } from '../AppointmentBook'

export default function ChooseProvider({handleNext, handlePrev}: FormActionProps) {
  return (
    <div className="flex flex-col p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold ">Step 2: Choose Provider</h2>
            <div className="space-y-3">
              <button
                className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => handleNext?.({ provider: 'Rohit Sharma' })}
              >
                Rohit Sharma | 2 Years
              </button>
              <button
                className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => handleNext?.({ provider: 'Rohit Sharma' })}
              >
                Rohit Sharma | 2 Years
              </button>
              <button
                className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600"
                onClick={() => handleNext?.({ provider: 'Rohit Sharma' })}
              >
                Rohit Sharma | 2 Years
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
