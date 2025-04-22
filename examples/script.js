import { Toaster } from '../dist/index.js';
const options = {}
const toast = new Toaster(options);
function showToast(index) {
    // toast.info({
<<<<<<< HEAD
    //     duration: 2000,
    //     // dismissable: true,
    //     position: 'top-center',
    // });

    toast.mood('sad', {
        duration: 2000,
        position: 'top-center',
=======
    //     duration: false,
    //     title: 'hello',
    //     description: 'fksjadf fskafjkl',
    //     dismissable: true,
    //     position: 'top-center',
    //     // centered: true,
    // });
    toast.html({
        code: `<div class='font-semibold'>
        hello world
        </div>`
>>>>>>> htmltoast
    })
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})