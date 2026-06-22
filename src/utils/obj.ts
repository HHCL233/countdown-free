export function pick(obj: Object, keys: any[]) {
    return Object.fromEntries(Object.entries(obj).filter(([key]) => keys.includes(key)))
}
