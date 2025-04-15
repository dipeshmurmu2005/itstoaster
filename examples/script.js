import { Toaster } from '../dist/index.js';
const options = {}
const toast = new Toaster(options);
function showToast(index) {
    toast.info({
        duration: false,
        dismissable: true,
    });
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})