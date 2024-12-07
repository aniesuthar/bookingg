interface StepFormData {
    service: string;
    provider: string;
    slot: string;
    name: string;
    age: string;
    gender: string;
    phone: string;
}
interface StepFormState {
    currentStep: number;
    formData: StepFormData;
    totalSteps: number;
    setStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    updateFormData: (data: Partial<StepFormData>) => void;
    resetForm: () => void;
}
export declare const useStepFormStore: import("zustand").UseBoundStore<import("zustand").StoreApi<StepFormState>>;
export {};
