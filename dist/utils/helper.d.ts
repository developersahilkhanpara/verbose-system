export declare function getStableInstanceId(): string;
export interface DiskInfo {
    path: string;
    totalGB: number;
    usedGB: number;
    freeGB: number;
    usedPercentage: string;
}
export interface SystemInfo {
    cpu: {
        model: string;
        speedMHz: number;
        cores: number;
    };
    memory: {
        totalMB: number;
        freeMB: number;
    };
    disk: DiskInfo;
    os: {
        platform: string;
        arch: string;
        uptimeSeconds: number;
    };
}
export declare function getSystemInfo(): SystemInfo;
//# sourceMappingURL=helper.d.ts.map