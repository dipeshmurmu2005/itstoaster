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
export declare class Toaster {
    private container;
    private positions;
    private iconFinder;
    private containerId;
    constructor(containerId?: string);
    createNotificationSection(containerId: string): void;
    success(info?: ToastInfo): void;
    createToast(info: ToastInfo): void;
    styleStack(elements: NodeList, position: string | null): void;
    attachListeners(): void;
}
export {};
//# sourceMappingURL=index.d.ts.map