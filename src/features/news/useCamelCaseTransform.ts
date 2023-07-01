export const useCamelCaseTransform = (phrase:string) : string => {
    return phrase.split(" ")
            .map((str) => {
            return str.charAt(0).toUpperCase() + str.slice(1);
            })
            .join(" ");
}