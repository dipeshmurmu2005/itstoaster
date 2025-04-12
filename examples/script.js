import { Toaster } from '../dist/index.js';
const toast = new Toaster();
toast.success({
    title: 'Successfully Integrated Toast',
    description: 'You can now create your sales',
    dismissable: true,
    position: 'top-left',
    icon: {
        size: 30,
        color: '#000000'
    }
})

toast.success({
    title: 'Successfully Integrated Toast',
    description: 'You can now create your sales',
    dismissable: true,
    position: 'top-center',
    icon: {
        size: 30,
        color: '#000000'
    }
})

function showToast(index) {
    toast.success({
        title: 'Successfully Created' + index,
        description: 'You can now create your sales',
        dismissable: true,
        position: 'bottom-right',
    })
}
let index = 0;

document.getElementById('showtoast').addEventListener('click', () => {
    index++;
    showToast(index);
})