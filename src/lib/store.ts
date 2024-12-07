// src/store/stepFormStore.ts
import { create } from 'zustand';

interface StepFormData {
    service: string;
    provider: string;
    slot: string;
    name: string;
    age: string;
    gender: string;
    phone: string;
};
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

const initialState = {
    service: '',
    provider: '',
    slot: '',
    name: '',
    age: '',
    gender: '',
    phone: '',
};

export const useStepFormStore = create<StepFormState>((set) => ({
    currentStep: 1,
    formData: initialState,
    totalSteps: 5, // Update with your step count
    setStep: (step) => set({ currentStep: step }),
    nextStep: () =>
        set((state) => ({
            currentStep: Math.min(state.currentStep + 1, state.totalSteps),
        })),
    prevStep: () =>
        set((state) => ({
            currentStep: Math.max(state.currentStep - 1, 1),
        })),
    updateFormData: (data) =>
        set((state) => ({
            formData: { ...state.formData, ...data },
        })),
    resetForm: () => set({ currentStep: 1, formData: initialState }),
}));
