

const darkModeValue  = localStorage.getItem("darkMode") && localStorage.getItem("darkMode")

document.body.classList.add(darkModeValue as string)

export function addSystmeTheme() {
    const theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    document.body.classList.toggle(darkModeValue as string, theme === "dark")
    document.body?.classList.remove("light")

    setData(theme === "dark" ? "dark" : "light")
}


export function addDarkMode() {
    const body = window.document.body

    body?.classList.add("dark")
    body?.classList.remove("light")


    setData("dark")

}

export function addLightMode() {
    const body = window.document.body

    body?.classList.remove("dark")

    setData("light")

}


function setData(value: string) {
    localStorage.setItem("darkMode", value)
}