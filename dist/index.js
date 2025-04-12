import { icons } from "./icons.js";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
export class Toaster {
    constructor() {
        this.container = null;
        this.createNotificationSection();
        this.attachListeners();
    }
    createNotificationSection() {
        var itstoasterContainer = document.createElement('div');
        itstoasterContainer.setAttribute('id', 'itstoaster-section');
        itstoasterContainer.innerHTML = `<div class='toast-stack top-left'></div>
        <div class='toast-stack top-center'></div>
        <div class='toast-stack top-right'></div>
        <div class='toast-stack bottom-left'></div>
        <div class='toast-stack bottom-right'></div>
        <div class='toast-stack bottom-center'></div>`;
        this.container = document.body.appendChild(itstoasterContainer);
    }
    success(info) {
        if ('position' in info && (info.position == 'top-left' || info.position == 'top-right' || info.position == 'top-center' || info.position == 'bottom-left' || info.position == 'bottom-center' || info.position == 'bottom-right')) {
            var toast = document.createElement('toast');
            toast.setAttribute('class', `success-toast toast-${info.position}`);
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
            var stack = $('#itstoaster-section' + ' ' + '.' + info.position);
            if (stack) {
                stack.appendChild(toast);
            }
            this.styleStack(info.position);
        }
    }
    styleStack(position) {
        var elements = $$('#itstoaster-section' + ' ' + '.' + 'toast-' + position);
        if (elements.length > 1) {
            elements.forEach((toast, index) => {
                toast.style.position = "absolute";
                if (elements.length != index + 1) {
                    if (position == 'top-right') {
                        toast.style.transform = `scale(${1 - ((elements.length - (index + 1)) / 15)}) translateY(${((elements.length - (index + 1))) * 10 + 'px'})`;
                    }
                }
            });
        }
    }
    attachListeners() {
        var topRightStack = $('.toast-stack.top-right');
        topRightStack === null || topRightStack === void 0 ? void 0 : topRightStack.addEventListener('mouseenter', () => {
            var _a;
            var stackElements = Array.from((_a = topRightStack === null || topRightStack === void 0 ? void 0 : topRightStack.querySelectorAll('toast')) !== null && _a !== void 0 ? _a : []);
            stackElements.forEach((toast, toastIndex) => {
                const y = getY(stackElements, toastIndex);
                toast.style.transform = `scale(1) translateY(${y}px)`;
            });
        });
        topRightStack === null || topRightStack === void 0 ? void 0 : topRightStack.addEventListener('mouseleave', () => {
            this.styleStack('top-right');
        });
        function getY(stack, toastIndex) {
            var yValue = 0;
            stack.forEach((element, index) => {
                if (element instanceof Element) {
                    if (index > toastIndex) {
                        yValue += element.getBoundingClientRect().height + 20;
                    }
                }
            });
            return yValue;
        }
    }
}
//# sourceMappingURL=index.js.map