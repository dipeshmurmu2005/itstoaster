import { Toaster } from '../dist/index.js';
const options = {}
const toast = new Toaster(options);
function showToast(index) {
    // toast.info({
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
    })
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})