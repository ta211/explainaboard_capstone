export function variableNameToDisplay(name) {
    const parts = name.split("_");
    return parts.map(part => part[0].toUpperCase() + part.substring(1)).join(" ");
}