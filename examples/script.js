import { Toaster } from '../dist/index.js';
const toast = new Toaster();
function showToast(index) {
    toast.info({
        duration: 8000,
        // showProgress: false,
    });
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})