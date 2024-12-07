"use client"
import React from 'react'
import { useStepFormStore } from '@/lib/store';
import { FormActionProps } from '../AppointmentBook';

export default function AddDetails({handlePrev, handleSubmit}: FormActionProps) {
    const {formData, updateFormData} = useStepFormStore();
    return (
        <div className="flex flex-col p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold ">Step 4: Add Details</h2>
            <form
                className="space-y-4"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col">
                    <label >Name</label>
                    <input
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => updateFormData({ name: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label >Age</label>
                    <input
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter your age"
                        value={formData.age}
                        onChange={(e) => updateFormData({ age: e.target.value })}
                    />
                </div>
                <div className="flex flex-col">
                    <label >Gender</label>
                    <select
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.gender}
                        onChange={(e) => updateFormData({ gender: e.target.value })}
                    >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <label >Phone Number</label>
                    <input
                        className="py-2 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={(e) => updateFormData({ phone: e.target.value })}
                    />
                </div>
                <div className="mt-4 flex justify-between">
                    <button
                        className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg"
                        onClick={handlePrev}
                    >
                        Back
                    </button>
                    <button
                        className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        type="submit"
                    >
                        Book Service
                    </button>
                </div>
            </form>
        </div>
    )
}
