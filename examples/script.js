import { Toaster } from '../dist/index.js';
const options = {}
const toast = new Toaster(options);
function showToast(index) {
    // toast.info({
    //     duration: 2000,
    //     // dismissable: true,
    //     position: 'top-center',
    // });

    toast.mood('sad', {
        duration: 2000,
        position: 'top-center',
    })
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})