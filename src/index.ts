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
    duration?: number | boolean;
    showProgress?: boolean;
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
    centered?: boolean;
    showProgress?: boolean;
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

const moods = {
    happy: '😊',
    sad: '😞',
    angry: '😡',
    surprised: '😲',
    excited: '😃',
    confused: '😕',
    hopeful: '🌟',
    grateful: '🙏',
    indifferent: '😐',
    proud: '😌',
    frustrated: '😣',
    confident: '💪',
    relieved: '😅',
    anxious: '😟',
    calm: '😌',
    embarrassed: '😳',
    nostalgic: '🕰️',
    optimistic: '🌞'
} as const;

type moodyToast = {
    title?: string;
    description?: string;
    position?: string | null;
    dismissable?: boolean;
    mood?: string;
    duration?: number | boolean;
    showProgress?: boolean;
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
        this.positions = ['top-left', 'top-center', 'top-right', 'bottom-right', 'bottom-left', 'bottom-center']
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
            showProgress: false,
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
            showProgress: false,
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
            showProgress: false,
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
            showProgress: false,
        }
        const finalInfo = { ...defaultInfo, ...info, icon: { ...defaultInfo.icon, ...info.icon } };
        if (this.positions.find((position) => position == finalInfo.position)) {
            this.createToast(finalInfo);
        }
    }


    createToast(info: ToastInfo | HTMLToast, mood: string = '', customHTML: boolean = false) {
        var toast = document.createElement('toast');
        toast.setAttribute('class', `toast-element dark:bg-[#08090a] dark:border dark:border-[#222226] dark:text-white toast-${info.position}`);

        if (info.position == "top-right" || info.position == 'top-center' || info.position == 'top-left') {
            toast.style.animation = 'fadeindown 0.5s';
        } else {
            toast.style.animation = 'fadeup 0.5s';
        }


        var contentWrapper = document.createElement('div');
        contentWrapper.setAttribute('class', 'content');
        if (info.centered || (!('description' in info)) || info.description == '' || info.description == null) {
            contentWrapper.setAttribute('class', 'content centered');
        }

        // icon
        var icon = document.createElement('div');
        icon.setAttribute('class', 'icon');

        if (mood == '') {
            if (info.icon?.color) {
                icon.style.color = info.icon.color;
            }
            var iconSvg = this.iconFinder.getIcon(info.icon?.name ?? '', info.icon?.size);
            if (iconSvg) {
                icon.appendChild(iconSvg)
            }
        } else {
            icon.setAttribute('class', 'icon mood');
            icon.textContent = mood;
        }
        contentWrapper.appendChild(icon);

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
            var element = stackElements[0] as HTMLElement;
            element.remove();
        }

        var stack = $('.' + info.position)
        if (stack) {
            stack.appendChild(toast);
        }

        //    if duration
        if (info.duration != false) {
            var timer = info.duration == true ? 3000 : info.duration;
            this.durationController(toast, timer ?? 3000, info.showProgress);
        }

        var stackElements = $$('.' + 'toast-' + info.position);
        this.styleStack(stackElements, info.position ?? null);
    }


    durationController(toast: HTMLElement, timer: number, showProgress: boolean | undefined) {
        if (showProgress) {
            // Create progress bar structure
            var progressBar = document.createElement('div');
            progressBar.setAttribute('class', 'duration-progress');

            var progress = document.createElement('div');
            progress.setAttribute('class', 'progress');

            progressBar.appendChild(progress);
            toast.appendChild(progressBar);
        }

        // Duration logic
        var startTime = Date.now();
        var remainingTime = timer;
        var elapsedTime = 0;
        var toastDurationId = Date.now();
        var isStop = false;

        function startDuration() {
            startTime = Date.now();
            if (showProgress) {
                // Reset width to current state before animating
                requestAnimationFrame(() => {
                    progress.style.transition = 'none'; // Remove previous transition
                    progress.style.transition = `width ${remainingTime}ms linear`;
                    progress.style.width = '0%';
                });
            }
            // Set timeout to remove toast
            toastDurationId = setTimeout(() => {
                toast.classList.add('toast-removing');
                toast.style.animation = 'none';
                toast.style.animation = 'fadeOut 0.3s';
                toast.addEventListener('animationend', (e) => {
                    toast.remove();
                }, { once: true });
            }, remainingTime);
        }

        // Pause on hover
        toast.addEventListener('mouseover', () => {
            if (!isStop) {
                clearTimeout(toastDurationId);
                elapsedTime = Date.now() - startTime;
                remainingTime = remainingTime - elapsedTime;

                if (showProgress) {
                    const computedStyle = window.getComputedStyle(progress);
                    const currentWidth = computedStyle.width;
                    progress.style.transition = 'none';
                    progress.style.width = currentWidth;
                }
            }
            isStop = true;
        });

        // Resume on mouse leave
        toast.addEventListener('mouseleave', () => {
            isStop = false;
            startDuration();
        });

        // Start the duration initially
        startDuration();
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
            var scaleValue = 1 - (elements.length - (index + 1)) / (elements.length * 5);
            if (position == 'top-right' || position == 'top-center' || position == 'top-left') {
                (toast as HTMLElement).style.position = "absolute";
                (toast as HTMLElement).style.transform =
                    `scale(${scaleValue}) translateY(${((elements.length - (index + 1)) * 10) + scaleValue}px)`;
            } else {
                (toast as HTMLElement).style.position = "absolute";
                (toast as HTMLElement).style.transform = `scale(${scaleValue}) translateY(-${((elements.length - (index + 1)) * 10) + scaleValue}px)`
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
                if (position != 'bottom-right' && position != 'bottom-left' && position != 'bottom-center') {
                    toast.style.transform = `scale(1) translateY(${stackDimension.yValue}px)`;
                } else {
                    toast.style.transform = `scale(1) translateY(-${stackDimension.yValue}px)`;
                }
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

    getMoodEmoji(mood: string) {
        // Type assertion for `mood` to ensure it's a valid key of `moods`
        const moodKey = mood.toLowerCase() as keyof typeof moods;

        if (moods[moodKey]) {
            return moods[moodKey];
        }
    }
    mood(mood: string, info: ToastInfo) {
        mood = this.getMoodEmoji(mood) ?? '';
        if (mood != '') {
            this.createToast(info, mood);
        }
    }
    html(info: HTMLToast) {
        info = { ...defaultHTMLToast, ...info };
        this.createToast(info, '', true);
    }
}