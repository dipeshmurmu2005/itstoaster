import { Toaster } from '../dist/index.js';
const options = {
    stackSize: 1,
}
const toast = new Toaster(options);
function showToast(index) {
    toast.success({
        title: 'Successfully Created' + index,
        description: 'You can now create your sales',
        dismissable: true,
        duration: 5000,
        position: 'top-right',
        icon: {
            color: '#f30020'
        }
    })
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})