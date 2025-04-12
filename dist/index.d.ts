export declare class Toaster {
    private container;
    private positions;
    private iconFinder;
    private containerId;
    constructor(containerId?: string);
    createNotificationSection(containerId: string): void;
    success(info?: {
        position?: string | null;
        dissmissable?: boolean;
    }): void;
    createToast(info: {
        position?: string | null;
        dismissable?: boolean;
    } | undefined, iconName: string): void;
    styleStack(elements: NodeList, position: string | null): void;
    attachListeners(): void;
}
//# sourceMappingURL=index.d.ts.map