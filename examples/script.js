import { Toaster } from '../dist/index.js';
const options = {}
const toast = new Toaster(options);
function showToast(index) {
    toast.info({
        dismissable: true,
        position: 'bottom-right',
    });

    // // toast.mood('happy', {
    // //     duration: 2000,
    // //     position: 'top-center',
    // // })
    // toast.html("<h3>hello</h3>", {
    //     duration: 3000,
    // });
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})