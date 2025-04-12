import { Icons } from "./icons.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);
export class Toaster {
    private container: HTMLElement | null;
    private positions: Array<string>;
    private iconFinder: Icons;
    private containerId: string;
    constructor(containerId: string = 'itstoaster-container') {
        this.container = null;
        this.containerId = containerId;
        this.iconFinder = new Icons();
        this.positions = ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']
        this.createNotificationSection(containerId);
        this.attachListeners();
    }
    createNotificationSection(containerId: string) {
        var itstoasterContainer = document.createElement('div');
        itstoasterContainer.setAttribute('id', containerId);
        this.positions.forEach(position => {
            var toastStack = document.createElement('div');
            toastStack.setAttribute('class', `toast-stack ${position}`);
            toastStack.setAttribute('position', position);
            itstoasterContainer.appendChild(toastStack);
        })
        document.body.appendChild(itstoasterContainer);
    }
    success(info: { position?: string | null, dissmissable?: boolean } = {
        position: 'top-right',
        dissmissable: false
    }) {
        this.createToast(info, 'check_circle');
    }

    createToast(info: { position?: string | null, dismissable?: boolean } = { position: 'top-right', dismissable: false }, iconName: string) {
        var toast = document.createElement('toast');
        toast.setAttribute('class', `success-toast toast-${info.position}`);
        var toastContent = document.createElement('div');
        toastContent.setAttribute('class', 'content');

        // icon
        var icon = document.createElement('div');
        icon.setAttribute('class', 'icon');
        icon.innerHTML = `${this.iconFinder.getIcon(iconName)}`;

        var contentWrapper = document.createElement('div');
        contentWrapper.setAttribute('class', 'content');

        // content
        var content = document.createElement('div');
        content.setAttribute('class', 'info');
        if (info && 'title' in info && 'description' in info) {
            content.innerHTML = `<h2>${info.title}</h2><p>${info.description}</p>`;
        } else {
            content.innerHTML = `<h2>Title</h2><p>Description</p>`;
        }

        contentWrapper.appendChild(icon);
        contentWrapper.appendChild(content);

        // is dismissable

        console.log(info.dismissable);
        if (info.dismissable) {
            let closeBtn = document.createElement('button');
            closeBtn.className = 'dismiss-btn';
            closeBtn.innerHTML = `${this.iconFinder.getIcon('cross')}`;
            contentWrapper.appendChild(closeBtn);
            closeBtn.addEventListener('click', () => {
                toast.remove();
            })
        }

        toast.appendChild(contentWrapper);


        // add to stack

        var stack = $('#' + this.containerId + ' ' + '.' + info.position)
        if (stack) {
            stack.appendChild(toast);
        }

        var stackElements = $$('#' + this.containerId + ' ' + '.' + 'toast-' + info.position);

        this.styleStack(stackElements, info.position ?? null);
    }



    styleStack(elements: NodeList, position: string | null) {
        if (elements.length > 1) {
            elements.forEach((toast, index) => {
                (toast as HTMLElement).style.position = "absolute";
                if (elements.length != index + 1) {
                    if (position == 'top-right' || position == 'top-center' || position == 'top-left') {
                        (toast as HTMLElement).style.transform =
                            `scale(${1 - ((elements.length - (index + 1)) / 15)}) translateY(${(elements.length - (index + 1)) * 10}px)`;
                    }
                }
            })
        }
    }
    attachListeners() {
        var toastStacks = $$('.toast-stack');
        toastStacks.forEach(stack => {
            stack.addEventListener('mouseenter', () => {
                var stackElements = Array.from(
                    stack.querySelectorAll('toast') ?? []
                ) as HTMLDivElement[];

                stackElements.forEach((toast, toastIndex) => {
                    const stackDimension = getY(stackElements, toastIndex);
                    toast.style.transform = `scale(1) translateY(${stackDimension.yValue}px)`;
                    (stack as HTMLDivElement).style.height = stackDimension.height + 'px';
                })
            })
        })

        toastStacks.forEach(stack => {
            stack.addEventListener('mouseleave', () => {
                console.log(stack.getAttribute('position'));
                var toasts = stack.querySelectorAll('toast');
                this.styleStack(stack.querySelectorAll('toast'), stack.getAttribute('position') ?? null);
                (stack as HTMLDivElement).style.height = 'fit-content';
            })
        });

        function getY(stack: HTMLDivElement[], toastIndex: number) {
            var yValue = 0;
            var height = 0;
            stack.forEach((element, index) => {
                if (element instanceof Element) {
                    if (index > toastIndex) {
                        yValue += element.getBoundingClientRect().height + 20;
                    }
                }
                height += element.getBoundingClientRect().height + 20;
            })
            return {
                yValue: yValue,
                height: height
            };
        }
    }
}