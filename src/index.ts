import { Icons } from "./icons.js";

const $ = (selector: string) => document.querySelector(selector);
const $$ = (selector: string) => document.querySelectorAll(selector);

type Icon = {
    name?: string;
    color?: string;
    size?: number;
};

type ToastInfo = {
    title?: string;
    description?: string;
    position?: string | null;
    dismissable?: boolean;
    icon?: Icon;
};


export class Toaster {
    private container: HTMLElement | null;
    private positions: Array<string>;
    private iconFinder: Icons;
    private containerId: string;
    constructor(containerId: string = 'itstoaster-container') {
        this.container = null;
        this.containerId = containerId;
        this.iconFinder = new Icons();
        this.positions = ['top-left', 'top-center', 'top-right']
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
    success(info: ToastInfo = {}) {
        const defaultInfo: ToastInfo = {
            position: 'top-right',
            dismissable: false,
            title: 'Toaster Integrated Successfully',
            description: 'Enjoy using toaster',
            icon: {
                name: 'check_circle',
                size: 30,
                color: '#000000',
            }
        }
        const finalInfo = { ...defaultInfo, ...info, icon: { ...defaultInfo.icon, ...info.icon } };
        if (this.positions.find((position) => position == finalInfo.position)) {
            this.createToast(finalInfo);
        }
    }

    createToast(info: ToastInfo) {
        var toast = document.createElement('toast');
        toast.setAttribute('class', `success-toast toast-${info.position}`);
        var toastContent = document.createElement('div');
        toastContent.setAttribute('class', 'content');

        // icon
        var icon = document.createElement('div');
        icon.setAttribute('class', 'icon');
        icon.style.color = info.icon?.color ?? '#000000';
        var iconSvg = this.iconFinder.getIcon(info.icon?.name ?? '', info.icon?.size);
        if (iconSvg) {
            icon.appendChild(iconSvg)
        }

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
        if (info.dismissable) {
            let closeBtn = document.createElement('button');
            closeBtn.className = 'dismiss-btn';
            var closeIcon = this.iconFinder.getIcon('cross');
            if (closeIcon) {
                closeBtn.appendChild(closeIcon);
            }
            contentWrapper.appendChild(closeBtn);
            closeBtn.addEventListener('click', () => {
                toast.classList.add('toast-removing');
                toast.addEventListener('animationend', () => {
                    toast.remove();
                });
            })
        }

        toast.appendChild(contentWrapper);

        // remove more than 3 toast from stack
        var stackElements = $$('#' + this.containerId + ' ' + '.' + 'toast-' + info.position);
        if (stackElements.length > 2) {
            stackElements.forEach((element, index) => {
                if (index < 1) {
                    // element.remove();
                }
            })
        }

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
                if (elements.length != index + 1) {
                    if (position == 'top-right' || position == 'top-center' || position == 'top-left') {
                        var scaleValue = 1 - (elements.length - (index + 1)) / (elements.length * 5);
                        (toast as HTMLElement).style.position = "absolute";
                        (toast as HTMLElement).style.transform =
                            `scale(${scaleValue}) translateY(${((elements.length - (index + 1)) * 10) + scaleValue}px)`;
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
                    var position = toast.parentElement?.getAttribute('position');
                    const stackDimension = getY(stackElements, toastIndex);
                    toast.style.transform = `scale(1) translateY(${stackDimension.yValue}px)`;
                    (stack as HTMLDivElement).style.height = stackDimension.height + 'px';
                })
            })
        })

        toastStacks.forEach(stack => {
            stack.addEventListener('mouseleave', () => {
                var position = stack.getAttribute('position');
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
                height += element.getBoundingClientRect().height;
            })
            return {
                yValue: yValue,
                height: height
            };
        }
    }
}