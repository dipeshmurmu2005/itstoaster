import { Toaster } from '../dist/index.js';
const toast = new Toaster();
function showToast(index) {
    toast.success({
        title: 'Successfully Created' + index,
        description: 'You can now create your sales',
        dismissable: true,
        position: 'top-right',
    })
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})