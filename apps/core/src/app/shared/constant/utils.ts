
export const COMPARE_STRING = (a: string, b: string): number => {
    const name1 = a.toLowerCase();
    const name2 = b.toLowerCase();
    if (name1 > name2) { return 1; }
    if (name1 < name2) { return -1; }
    return 0;
}