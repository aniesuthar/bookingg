import React from 'react'
import { useStepFormStore } from '@/lib/store';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { Button } from '../ui/button';

export default function ChooseSlot() {
  const { formData, nextStep, prevStep, handleSelect } = useStepFormStore();

  const todaysDate = "2024-12-11T14:53:12.345Z";
  const maxAllowedDays = 10;
  const slidesToScroll = 7;

  // Function to generate date array
  const generateDates = (startDate: string, days: number) => {
    const dates = [];
    const start = new Date(startDate);

    for (let i = 0; i < days; i++) {
      const newDate = new Date(start);
      newDate.setDate(start.getDate() + i);
      const dayName = newDate.toLocaleDateString(undefined, { weekday: 'short' }); // E.g., "Mon"
      dates.push({ date: newDate.toISOString(), day: dayName });
    }

    return dates;
  };

  const datesArray = generateDates(todaysDate, maxAllowedDays);

  const slots = ["12:30 PM", "12:45 PM", "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM", "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM", "12:30 PM", "12:45 PM", "01:00 PM", "01:15 PM", "01:30 PM", "01:45 PM", "02:00 PM", "02:15 PM", "02:30 PM", "02:45 PM"];
  // Helper function to chunk the slots into groups of 6
  const chunkSlots = (slots: string[], size: number) => {
    const chunks = [];
    for (let i = 0; i < slots.length; i += size) {
      chunks.push(slots.slice(i, i + size));
    }
    return chunks;
  };

  const chunkedSlots = chunkSlots(slots, 6);
  console.log(chunkedSlots.length);


  return (
    <div className="flex flex-col p-6 rounded-lg space-y-4">
      <p>{formData.service.title} • {formData.service.price}</p>
      <p>{formData.provider.title}</p>
      <Carousel className="w-full space-y-4" opts={{ slidesToScroll: slidesToScroll }}>
        <div className='flex justify-between items-center'>
          Today, 12 Dec
          <div>
            <CarouselPrevious className='static translate-x-0 translate-y-0 bg-transparent border-none' />
            <CarouselNext className='static translate-x-0 translate-y-0 bg-transparent border-none' />
          </div>
        </div>
        <CarouselContent data-parent-content>
          {datesArray.map(({ date, day }, index) => (
            <CarouselItem key={index} style={{ flexBasis: (1 / slidesToScroll) * 100 + "%" }}>
              <div
                key={index}
                className='text-center py-4 px-0 rounded-full border-white/20 border-2 ring-primary/70 data-[active=true]:ring'
                data-active={formData.date === date}
                onClick={(e) => handleSelect(e, { date })}
              >
                <p className='font-light text-xs'>{day}</p>
                <p className='text-base font-medium mt-1'>{new Date(date).getDate()}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <Carousel className="w-full space-y-4 bg-secondary/10 p-2 rounded-xl" opts={{ slidesToScroll: 1 }}>
        <div className='flex justify-between items-center'>
          <span className='ml-2'>
            Showing available slots only
          </span>
          <div>
            <CarouselPrevious className='static translate-x-0 translate-y-0 bg-transparent border-none' />
            <CarouselNext className='static translate-x-0 translate-y-0 bg-transparent border-none' />
          </div>
        </div>
        <div className='p-2'>
          <CarouselContent data-carousel-content>
            {chunkedSlots.map((chunk, index) => (
              <CarouselItem key={index} style={{ flexBasis: "100%" }}>
                <div className="grid grid-cols-3 gap-4">
                  {chunk.map((slot, index) => (
                    <div
                      key={index}
                      data-active={formData.slot === slot}
                      className="text-center py-3 px-0 rounded-full bg-secondary/5 ring-primary/70 data-[active=true]:ring"
                      onClick={(e) => handleSelect(e, { slot })}
                    >
                      <p className="text-xs font-normal">{slot}</p>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>

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
