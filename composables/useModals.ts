export const useModals = () => {
    const callbackModalOpen = useState('callbackModalOpen', () => false)
    const calculatorModalOpen = useState('calculatorModalOpen', () => false)

    const openCallbackModal = () => {
        callbackModalOpen.value = true
    }

    const closeCallbackModal = () => {
        callbackModalOpen.value = false
    }

    const openCalculatorModal = () => {
        calculatorModalOpen.value = true
    }

    const closeCalculatorModal = () => {
        calculatorModalOpen.value = false
    }

    return {
        callbackModalOpen,
        calculatorModalOpen,
        openCallbackModal,
        closeCallbackModal,
        openCalculatorModal,
        closeCalculatorModal
    }
}