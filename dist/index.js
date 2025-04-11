import { icons } from "./icons.js";
export class Toaster {
    constructor() {
    }
    success(info) {
        var toast = document.createElement('toast');
        toast.setAttribute('class', 'success-toast');
        var icon = document.createElement('div');
        icon.setAttribute('class', 'icon');
        icon.innerHTML = icons.check_circle;
        toast.appendChild(icon);
        var desc = document.createElement('div');
        desc.setAttribute('class', 'info');
        if (info && 'title' in info && 'description' in info) {
            desc.innerHTML = `<h2>${info.title}</h2><p>${info.description}</p>`;
        }
        else {
            desc.innerHTML = `<h2>Title</h2><p>Description</p>`;
        }
        toast.appendChild(desc);
        const closeBtn = document.createElement('button');
        closeBtn.className = 'dismiss-btn';
        closeBtn.innerHTML = icons.cross;
        toast.appendChild(closeBtn);
        document.body.appendChild(toast);
    }
}
//# sourceMappingURL=index.js.map