import { Toaster } from '../dist/index.js';
const options = {}
const toast = new Toaster(options);
function showToast(index) {
    toast.info({
        duration: 3000,
        // dismissable: true,
        showProgress: true,
        position: 'bottom-right',
    });

    // toast.mood('happy', {
    //     duration: 2000,
    //     position: 'top-center',
    // })
    // toast.html({
    //     code: '<h3>hello</h3>'
    // });
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})