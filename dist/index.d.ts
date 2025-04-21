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
};
type Constructor = {
    containerId: string;
    stackSize: number;
};
type HTMLToast = {
    code: string;
    icon?: Icon;
    position?: string | null;
    dismissable?: boolean;
    duration?: number | boolean;
    centered?: boolean;
};
export declare class Toaster {
    private container;
    private positions;
    private iconFinder;
    private containerId;
    private stackSize;
    private options;
    constructor(options?: Partial<Constructor>);
    createNotificationSection(containerId: string): void;
    success(info?: ToastInfo): void;
    warning(info?: ToastInfo): void;
    error(info?: ToastInfo): void;
    info(info?: ToastInfo): void;
    createToast(info: ToastInfo | HTMLToast, customHTML?: boolean): void;
    styleStack(elements: HTMLDivElement[] | NodeList, position: string | null, reStack?: boolean): void;
    attachListeners(): void;
    html(info: HTMLToast): void;
}
export {};
//# sourceMappingURL=index.d.ts.map