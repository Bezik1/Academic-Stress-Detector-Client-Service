
export const priettifySessionKey = (oldSessionKey: string) => {
    let newString = ""
    for (let i = 0; i < oldSessionKey.length; i++) {
        const letter = oldSessionKey[i]
        if (letter === letter.toUpperCase()) newString += " "
        newString += letter.toLowerCase()
    }
    return newString
}