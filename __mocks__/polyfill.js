export const raf = global.requestAnimationFrame = (callback) => {
    setTimeout(callback, 0);
};
