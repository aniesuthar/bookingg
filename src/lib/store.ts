// src/store/stepFormStore.ts
import { create } from 'zustand';

interface StepFormData {
    service: {
        title: string,
        image: string,
        price: string,
        duration: string,
    };
    provider: {
        title: string
    };
    slot: string;
    date: string
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
    handleSelect: (event: React.MouseEvent<HTMLElement>, data: Record<string, any>) => void;
}

const initialState = {
    service: {
        title: '',
        image: '',
        price: '',
        duration: '',
    },
    date: '',
    provider: {title: ""},
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
    handleSelect: (event: any, data: Record<string, any>) => {
        // Get the closest carousel or parent container
        const parentContainer = event.currentTarget.closest("[data-parent-content]");

        // Remove `data-active` only from siblings within the same container
        parentContainer?.querySelectorAll("[data-active]").forEach((el: any) => el.removeAttribute("data-active"));

        // Add `data-active` to the clicked element
        event.currentTarget.setAttribute("data-active", "true");

        // Update formData state with the selected data
        set((state) => ({
            formData: { ...state.formData, ...data },
        }));
    },
}));
