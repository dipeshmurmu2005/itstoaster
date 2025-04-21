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
    centered?: boolean;
    duration?: number | boolean
};

type Constructor = {
    containerId: string,
    stackSize: number
}

type HTMLToast = {
    code: string;
    icon?: Icon;
    position?: string | null;
    dismissable?: boolean;
    duration?: number | boolean;
    centered?: boolean
}

const defaultHTMLToast: HTMLToast = {
    code: `
    <div class="custom">
        <h1>Want help setting up</h1>
        <p>Please read the docs</p>
    </div>
    `,
    icon: {
        name: 'exclamation_circle',
        color: '#000000',
        size: 35,
    },
    position: 'top-right',
    dismissable: true,
    duration: 3000,
    centered: false,
}

const defaultOptions: Constructor = {
    containerId: 'itstoaster-container',
    stackSize: 3,
}


export class Toaster {
    private container: HTMLElement | null;
    private positions: Array<string>;
    private iconFinder: Icons;
    private containerId: string;
    private stackSize: number;
    private options: Constructor;
    constructor(options: Partial<Constructor> = {}) {
        this.options = { ...defaultOptions, ...options };
        this.container = null;
        this.stackSize = this.options.stackSize;
        this.containerId = this.options.containerId;
        this.iconFinder = new Icons();
        this.positions = ['top-left', 'top-center', 'top-right']
        this.createNotificationSection(this.containerId);
        this.attachListeners();
    }
    createNotificationSection(containerId: string) {
        this.positions.forEach(position => {
            var toastStack = document.createElement('div');
            toastStack.setAttribute('class', `toast-stack ${position}`);
            toastStack.setAttribute('position', position);
            document.body.appendChild(toastStack);
        })
    }
    success(info: ToastInfo = {}) {
        const defaultInfo: ToastInfo = {
            position: 'top-right',
            dismissable: false,
            title: 'Boom. Nailed it',
            description: 'You just leveled up your workflow.',
            duration: 3000,
            centered: false,
            icon: {
                name: 'check_circle',
                size: 30,
                color: undefined,
            },
        }
        const finalInfo = { ...defaultInfo, ...info, icon: { ...defaultInfo.icon, ...info.icon } };
        if (this.positions.find((position) => position == finalInfo.position)) {
            this.createToast(finalInfo);
        }
    }
    warning(info: ToastInfo = {}) {
        const defaultInfo: ToastInfo = {
            position: 'top-right',
            dismissable: false,
            title: "Warning Issued",
            description: 'It’s not broken, but it’s definitely twitchy.',
            duration: 3000,
            centered: false,
            icon: {
                name: 'exclamation_circle',
                size: 30,
                color: undefined,
            },
        }
        const finalInfo = { ...defaultInfo, ...info, icon: { ...defaultInfo.icon, ...info.icon } };
        if (this.positions.find((position) => position == finalInfo.position)) {
            this.createToast(finalInfo);
        }
    }

    error(info: ToastInfo = {}) {
        const defaultInfo: ToastInfo = {
            position: 'top-right',
            dismissable: false,
            title: "Crash Landing",
            description: 'That didn’t go as expected. Let’s debug',
            duration: 3000,
            centered: false,
            icon: {
                name: 'triangular_error',
                size: 30,
                color: undefined,
            },
        }
        const finalInfo = { ...defaultInfo, ...info, icon: { ...defaultInfo.icon, ...info.icon } };
        if (this.positions.find((position) => position == finalInfo.position)) {
            this.createToast(finalInfo);
        }
    }

    info(info: ToastInfo = {}) {
        const defaultInfo: ToastInfo = {
            position: 'top-right',
            dismissable: false,
            title: "Ping from the System",
            description: 'Nothing’s broken. Just keeping you informed',
            duration: 3000,
            centered: false,
            icon: {
                name: 'info_circle',
                size: 30,
                color: undefined,
            },
        }
        const finalInfo = { ...defaultInfo, ...info, icon: { ...defaultInfo.icon, ...info.icon } };
        if (this.positions.find((position) => position == finalInfo.position)) {
            this.createToast(finalInfo);
        }
    }


    createToast(info: ToastInfo | HTMLToast, customHTML: boolean = false) {
        var toast = document.createElement('toast');
        toast.setAttribute('class', `toast-element dark:bg-[#08090a] dark:border dark:border-[#222226] dark:text-white toast-${info.position}`);


        var contentWrapper = document.createElement('div');
        contentWrapper.setAttribute('class', 'content');
        if (info.centered || (!('description' in info)) || info.description == '' || info.description == null) {
            contentWrapper.setAttribute('class', 'content centered');
        }

        if (info.icon) {
            // icon
            var icon = document.createElement('div');
            icon.setAttribute('class', 'icon');
            if (info.icon?.color) {
                icon.style.color = info.icon.color;
            }
            var iconSvg = this.iconFinder.getIcon(info.icon?.name ?? '', info.icon?.size);
            if (iconSvg) {
                icon.appendChild(iconSvg)
            }
            contentWrapper.appendChild(icon);
        }

        // content
        var content = document.createElement('div');
        content.style.width = "100%";
        content.setAttribute('class', 'info');

        if (customHTML && 'code' in info) {
            content.innerHTML = info.code;
        } else {
            if (info && 'title' in info && 'description' in info) {
                content.innerHTML = `<h2>${info.title}</h2>${info.description ? '<p>' + info.description + '</p>' : ''}`;
            } else {
                content.innerHTML = `<h2>Title</h2><p>Description</p>`;
            }
        }

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

        var stackElements = $$('.' + 'toast-' + info.position);
        this.stackSize = this.stackSize < 2 ? 2 : this.stackSize
        if (stackElements.length >= this.stackSize) {
            stackElements[0].remove();
        }

        var stack = $('.' + info.position)
        if (stack) {
            stack.appendChild(toast);
        }

        //    if duration
        if (info.duration != false) {
            var timer = info.duration == true ? 3000 : info.duration;
            setTimeout(() => {
                toast.classList.add('toast-removing');
                toast.addEventListener('animationend', () => {
                    toast.remove();
                })
            }, timer);
        }

        var stackElements = $$('.' + 'toast-' + info.position);
        this.styleStack(stackElements, info.position ?? null);
    }



    styleStack(elements: HTMLDivElement[] | NodeList, position: string | null, reStack: boolean = false) {
        if (elements.length > 1) {
            elements.forEach((toast, index) => {
                if (!reStack) {
                    if (elements.length != index + 1) {
                        applyStyle(toast, index);
                    }
                } else {
                    applyStyle(toast, index);
                }
            })

        }

        function applyStyle(toast: Node | HTMLDivElement, index: number) {
            if (position == 'top-right' || position == 'top-center' || position == 'top-left') {
                var scaleValue = 1 - (elements.length - (index + 1)) / (elements.length * 5);
                (toast as HTMLElement).style.position = "absolute";
                (toast as HTMLElement).style.transform =
                    `scale(${scaleValue}) translateY(${((elements.length - (index + 1)) * 10) + scaleValue}px)`;
            }
        }
    }
    attachListeners() {
        var toastStacks = $$('.toast-stack');
        toastStacks.forEach(stack => {
            stack.addEventListener('mouseenter', () => {
                listStack(stack);
            })
            stack.addEventListener('touchstart', () => {
                listStack(stack);
            })
        })

        function listStack(stack: Element) {
            var stackElements = Array.from(
                stack.querySelectorAll('toast') ?? []
            ) as HTMLDivElement[];

            stackElements.forEach((toast, toastIndex) => {
                var position = toast.parentElement?.getAttribute('position');
                const stackDimension = getY(stackElements, toastIndex);
                toast.style.transform = `scale(1) translateY(${stackDimension.yValue}px)`;
                (stack as HTMLDivElement).style.height = stackDimension.height + 'px';
            })
        }

        toastStacks.forEach(stack => {
            stack.addEventListener('mouseleave', () => {
                reformStack(stack);
            })
            stack.addEventListener('touchend', () => {
                reformStack(stack);
            })
        });

        const reformStack = (stack: Element) => {
            var position = stack.getAttribute('position');
            var toasts = stack.querySelectorAll('toast');
            var newToasts = (Array.from(toasts).filter((toast) => {
                return !toast.classList.contains('toast-removing');
            })) as HTMLDivElement[];
            if (newToasts.length == 1) {
                var height = toasts[0].getBoundingClientRect().height + 'px';
                newToasts[0].style.transform = `scale(1)`;
                (stack as HTMLDivElement).style.height = toasts[0].getBoundingClientRect().height + 'px';
            } else {
                this.styleStack(newToasts, stack.getAttribute('position') ?? null, true);
                (stack as HTMLDivElement).style.height = 'fit-content';
            }
        }

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
    html(info: HTMLToast) {
        info = { ...defaultHTMLToast, ...info };
        this.createToast(info, true);
    }
}