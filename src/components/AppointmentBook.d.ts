import React from 'react';
import "@/app/globals.css";
export interface FormActionProps {
    handlePrev?: () => void;
    handleNext?: (data: Record<string, any>) => void;
    handleSubmit?: (e: React.FormEvent) => void;
}
declare const StepForm: ({ hospitalId }: {
    hospitalId: string;
}) => import("react/jsx-runtime").JSX.Element;
export default StepForm;
