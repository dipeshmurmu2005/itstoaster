import { Toaster } from '../dist/index.js';
const toast = new Toaster();
toast.success({
    title: 'Successfully Created',
    description: 'You can now create your sales',
    dismissible: true,
})