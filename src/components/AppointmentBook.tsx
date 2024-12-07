"use client"
import React from 'react';
import { useStepFormStore } from '@/lib/store';
import Step1 from "./steps/ChooseService"
import Step2 from "./steps/ChooseProvider"
import Step3 from "./steps/ChooseSlot"
import Step4 from "./steps/AddDetails"
import Step5 from "./steps/Successful"
import "@/app/globals.css"
import { cn } from '@/lib/utils';


export interface FormActionProps {
  handlePrev?: () => void;
  handleNext?: (data: Record<string, any>) => void;
  handleSubmit?: (e: React.FormEvent) => void;
}

const stepsTitle = [
  "Choose Service",
  "Choose Provider",
  "Choose Slot",
  "Add Details",
  "Confirm",
]

const StepForm = ({ hospitalId }: { hospitalId: string }) => {
  const {
    currentStep,
    nextStep,
    prevStep,
    updateFormData,
  } = useStepFormStore();

  const totalSteps = 5; // Total steps in your form

  const handleNext = (data: Record<string, any>) => {
    updateFormData(data);
    nextStep();
  };

  const handlePrev = () => {
    prevStep();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Show confirmation on successful submission
    nextStep(); // Go to the confirmation step
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1 handleNext={handleNext} />
        );
      case 2:
        return (
          <Step2 handleNext={handleNext} handlePrev={handlePrev} />
        );
      case 3:
        return (
          <Step3 handleNext={handleNext} handlePrev={handlePrev} />
        );
      case 4:
        return (
          <Step4 handlePrev={handlePrev} handleSubmit={handleSubmit} />
        );
      case 5: // Confirmation Step
        return (
          <Step5 handlePrev={handlePrev} />
        );
      default:
        return null;
    }
  };
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="space-y-6 mx-auto w-[520px] max-w-[820px] ab-widget bg-black p-6 text-white rounded-3xl">
      <div className='border-b border-gray-700'>
        <h1 className="text-2xl font-semibold mb-4">Book Your Appointment</h1>
      </div>

      {/* Step Progress Bar */}
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div
            className={cn(
              'text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-800 bg-teal-200 relative z-10',
              'transition-all duration-300 -translate-x-1/2',
              currentStep == 1 && 'translate-x-0',
              currentStep == 5 && '-translate-x-full',
            )}
            style={{ left: `${progressPercent}%` }}
          >
            {currentStep}. {stepsTitle[currentStep - 1]}
          </div>
          <div className='w-full h-[1px] bg-gray-400 absolute z-0' ></div>
          <div
            className='text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-800 bg-teal-400 relative z-0'
          >
            {currentStep}/{totalSteps}
          </div>
        </div>
      </div>

      {renderStep()}

    </div>
  );
};

export default StepForm;