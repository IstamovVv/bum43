// composables/useSubcategories.ts
export const useSubcategories = () => {
    const expandedCategory = ref<string | null>(null)

    const toggleSubcategories = (categoryId: string) => {
        // Закрываем другие, если открыты
        if (expandedCategory.value && expandedCategory.value !== categoryId) {
            expandedCategory.value = null
        }

        // Переключаем текущую
        expandedCategory.value = expandedCategory.value === categoryId ? null : categoryId
    }

    const isExpanded = (categoryId: string) => expandedCategory.value === categoryId

    const closeAll = () => {
        expandedCategory.value = null
    }

    // Закрытие при клике вне
    onMounted(() => {
        document.addEventListener('click', (e) => {
            const target = e.target as HTMLElement
            if (!target.closest('.category-card')) {
                closeAll()
            }
        })
    })

    return {
        expandedCategory,
        toggleSubcategories,
        isExpanded,
        closeAll
    }
}