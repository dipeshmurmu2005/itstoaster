import { Toaster } from '../dist/index.js';
const options = { stackSize: 5 }
const toast = new Toaster(options);
function showToast(index) {
    toast.info({
        duration: false,
        dismissable: true,
        position: 'bottom-center',
    });
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})