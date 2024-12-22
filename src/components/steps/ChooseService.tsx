import React from 'react'
import { FormActionProps } from '../AppointmentBook'
import { useStepFormStore } from '@/lib/store';
import { Button } from '../ui/button';

const services = [
    {
        title: "Men's Haircut",
        duration: "30Mins",
        price: "₹150",
        image: "https://tcbnaturals.com/kenya/blog/wp-content/uploads/2019/09/how_to_style_your_new_natural_hair_look.jpg"
    },
    {
        title: "Women's Haircut",
        duration: "30Mins",
        price: "₹150",
        image: "https://stylerug.net/wp-content/uploads/2017/05/buzz-cut-1024x683.webp"
    },
    {
        title: "Mssage",
        duration: "30Mins",
        price: "₹150",
        image: "https://img.etimg.com/thumb/width-1600,height-900,imgsize-37514,resizemode-75,msid-109107267/magazines/panache/how-pricey-is-virat-kohlis-new-badass-hair-style-the-answer-might-make-your-jaw-drop.jpg"
    },
    {
        title: "Facial",
        duration: "30Mins",
        price: "₹150",
        image: "https://peteandpedro.com/cdn/shop/articles/AdobeStock_389429066-scaled_jpeg_1024x1024.webp?v=1709220769"
    },
    {
        title: "Scrub",
        duration: "30Mins",
        price: "₹150",
        image: "https://images.squarespace-cdn.com/content/v1/5d5f2058a79cbf000111652a/1586842536251-IY8XEBZ4JINBCSKZKAHT/FaceMassage.jpg"
    },
]
export default function ChooseService({ handleNext }: FormActionProps) {
    const { formData, nextStep, handleSelect } = useStepFormStore();

    return (
        <div className="flex flex-col pt-4 rounded-lg space-y-4">
            <div className="flex flex-wrap gap-4" data-parent-content>
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="p-2 cursor-pointer flex gap-2 items-center justify-start bg-white/15 text-white text-base rounded-lg hover:bg-white/20 flex-grow ring-primary/70 data-[active=true]:ring"
                        data-active={formData.service.title === service.title}
                        onClick={(e) => handleSelect(e, {service})}
                    >
                        <img src={service.image} alt="serivce-image" className='w-12 h-12 aspect-square object-cover rounded-lg' />
                        <span>
                            {service.title}
                            <span className='block text-sm opacity-60'>
                                {service.price} • {service.duration}
                            </span>
                        </span>
                    </div>
                ))}
            </div>
            <Button onClick={() => nextStep()}>Next</Button>
        </div>
    )
}
