export const convertSize = (size: number) => {
    const KB = 1024 ** 2;
    const MB = 1024 ** 3;

    if (size < 1024) {
        return `${size} Byte`
    } else if (size < KB) {
        return `${Math.round(size / 1024)} KB`;
    } else if (size < MB) {
        return `${Math.round(size / KB)} MB`;
    } else {
        return `${Math.round(size / MB)} GB`;
    }
};