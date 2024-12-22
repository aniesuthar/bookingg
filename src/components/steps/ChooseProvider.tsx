import React from 'react'
import { useStepFormStore } from '@/lib/store';
import { Button } from '../ui/button';

const service = {
  title: "Men's Haircut",
  duration: "30Mins",
  price: "₹150",
  image: "https://tcbnaturals.com/kenya/blog/wp-content/uploads/2019/09/how_to_style_your_new_natural_hair_look.jpg"
};

const providers = [
  {
    title: "Rahul Sharma",
    experience: "2 Years",
    price: "₹150",
    image: "https://tcbnaturals.com/kenya/blog/wp-content/uploads/2019/09/how_to_style_your_new_natural_hair_look.jpg"
  },
  {
    title: "Jatin Shah",
    experience: "2 Years",
    price: "₹150",
    image: "https://stylerug.net/wp-content/uploads/2017/05/buzz-cut-1024x683.webp"
  },
  {
    title: "Pooja Maan",
    experience: "2 Years",
    price: "₹150",
    image: "https://img.etimg.com/thumb/width-1600,height-900,imgsize-37514,resizemode-75,msid-109107267/magazines/panache/how-pricey-is-virat-kohlis-new-badass-hair-style-the-answer-might-make-your-jaw-drop.jpg"
  }
]
export default function ChooseProvider() {
  const { formData, nextStep, prevStep, handleSelect } = useStepFormStore();
  const service = formData.service;
  const data = fetch("https://api.postalpincode.in/pincode/110001");
  return (
    <div className="flex flex-col p-6 rounded-lg space-y-4">
      <div>
        <img src={service.image} alt="" className='h-44 rounded-lg w-full object-cover' />
        <span>
          {service.title}
          <span className='block text-sm opacity-60'>
            {service.price} • {service.duration}
          </span>
        </span>
      </div>
      <div className="space-y-3 space-x-3" data-parent-content>
        {providers.map((provider, index) => (
          <button
            key={index}
            data-active={formData.provider.title === provider.title}
            onClick={(e) => handleSelect(e, { provider })}
            className='ring-primary/70 data-[active=true]:ring'
          >
            <img src={provider.image} alt="" className='size-24 object-cover rounded-lg' />
            <p className='text-left'>
              {provider.title}
            </p>
            <p className='text-left opacity-60 font-light'>
              {provider.experience}
            </p>
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <Button
          variant='secondary'
          onClick={prevStep}
        >
          Back
        </Button>
        <Button
          onClick={() => nextStep()}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
