import { ref, watchEffect, type Ref } from 'vue'


const getActiveTheme = () => {
    return localStorage.getItem('theme')
}

const refTheme: Ref<string> = ref(getActiveTheme() || '')

const ThemeChangeColor = (theme: string) => {
    document.documentElement.className = theme
}

watchEffect(() => {
    const value = refTheme.value
    ThemeChangeColor(value)
})

export function useTheme() {
    return { ThemeChangeColor }
}