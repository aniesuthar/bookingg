import React from 'react'
import { FormActionProps } from '../AppointmentBook'

const services = [
    {
        title: "Men's Haircut",
        duration: "30Mins",
        price: "₹150"
    },
    {
        title: "Men's Haircut",
        duration: "30Mins",
        price: "₹150"
    },
    {
        title: "Men's Haircut",
        duration: "30Mins",
        price: "₹150"
    },
    {
        title: "Men's Haircut",
        duration: "30Mins",
        price: "₹150"
    },
    {
        title: "Men's Haircut",
        duration: "30Mins",
        price: "₹150"
    },
]
export default function ChooseService({ handleNext }: FormActionProps) {
    return (
        <div className="flex flex-col pt-4 rounded-lg space-y-4">
            <div className="flex flex-wrap gap-4">
                {services.map((service) => (
                    <div
                        className="py-3 px-6 bg-white/10 text-white text-base rounded-lg hover:bg-teal-600 flex-grow "
                        onClick={() => handleNext?.({ service: 'Men\'s Haircut' })}
                    >
                        {service.title}
                        <span className='block text-sm opacity-60'>
                            {service.price} • {service.duration}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
