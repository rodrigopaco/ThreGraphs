const delay = () => {
    return new Promise(resolve => {
        setTimeout(() => {
        resolve();
        }, 100);
    });
}
export default delay;