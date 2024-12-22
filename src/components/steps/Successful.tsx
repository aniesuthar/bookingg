"use client"
import React from 'react'
import { useStepFormStore } from '@/lib/store';
import { FormActionProps } from '../AppointmentBook';

export default function Successful({handlePrev}: FormActionProps) {
    const {formData, prevStep} = useStepFormStore();
    const dateFormatted = new Date(formData.date);
    return (
        <div className="flex flex-col p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold ">Booking Confirmation</h2>
            <div className="space-y-4">
                <p><strong>Service:</strong> {formData.service.title}</p>
                <p><strong>Provider:</strong> {formData.provider.title}</p>
                <p><strong>Date:</strong> {dateFormatted.toLocaleDateString("en-IN", {dateStyle: 'full'})}</p>
                <p><strong>Slot:</strong> {formData.slot}</p>
                <p><strong>Name:</strong> {formData.name}</p>
                <p><strong>Age:</strong> {formData.age}</p>
                <p><strong>Gender:</strong> {formData.gender}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
            </div>
            <div className="mt-4 flex justify-between">
            <button
                    className="py-2 px-4 bg-gray-300 text-gray-700 rounded-lg"
                    onClick={prevStep}
                >
                    Back
                </button>
                <button
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg"
                    onClick={() => alert('Booking Confirmed!')}
                >
                    Confirm Booking
                </button>
                
            </div>
        </div>)
}
