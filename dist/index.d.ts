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
    duration?: number | boolean;
};
type Constructor = {
    containerId: string;
    stackSize: number;
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
    createToast(info: ToastInfo): void;
    styleStack(elements: NodeList, position: string | null): void;
    attachListeners(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map