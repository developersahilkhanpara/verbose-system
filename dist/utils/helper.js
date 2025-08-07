"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStableInstanceId = getStableInstanceId;
exports.getSystemInfo = getSystemInfo;
const os_1 = __importDefault(require("os"));
const crypto_1 = require("crypto");
const node_disk_info_1 = require("node-disk-info");
function getStableInstanceId() {
    const hostname = os_1.default.hostname();
    const bootTime = os_1.default.uptime(); // in seconds since boot
    // Combine hostname + boot time in minutes
    const base = `${hostname}-${Math.floor(bootTime / 60)}`;
    // Hash it for consistency
    const hash = (0, crypto_1.createHash)('sha256').update(base).digest('hex');
    return `inst-${hash.slice(0, 12)}`;
}
function getSystemInfo() {
    var _a, _b;
    const cpus = os_1.default.cpus();
    const cpuInfo = {
        model: ((_a = cpus === null || cpus === void 0 ? void 0 : cpus[0]) === null || _a === void 0 ? void 0 : _a.model) || 'unknown',
        speedMHz: ((_b = cpus === null || cpus === void 0 ? void 0 : cpus[0]) === null || _b === void 0 ? void 0 : _b.speed) || 0,
        cores: (cpus === null || cpus === void 0 ? void 0 : cpus.length) || 0,
    };
    const memoryInfo = {
        totalMB: os_1.default.totalmem() / (1024 * 1024),
        freeMB: os_1.default.freemem() / (1024 * 1024),
    };
    let diskInfo = {
        path: '',
        totalGB: 0,
        usedGB: 0,
        freeGB: 0,
        usedPercentage: '0%',
    };
    try {
        const disks = (0, node_disk_info_1.getDiskInfoSync)();
        const primaryDisk = disks === null || disks === void 0 ? void 0 : disks[0];
        if (primaryDisk) {
            diskInfo = {
                path: primaryDisk.mounted,
                totalGB: parseFloat(primaryDisk.blocks.toString()) / 1000000,
                usedGB: parseFloat(primaryDisk.used.toString()) / 1000000,
                freeGB: parseFloat(primaryDisk.available.toString()) / 1000000,
                usedPercentage: primaryDisk.capacity,
            };
        }
    }
    catch (err) {
        console.error('❌ Disk info failed:', (err === null || err === void 0 ? void 0 : err.message) || err);
    }
    const osInfo = {
        platform: os_1.default.platform(),
        arch: os_1.default.arch(),
        uptimeSeconds: os_1.default.uptime(),
    };
    return {
        cpu: cpuInfo,
        memory: memoryInfo,
        disk: diskInfo,
        os: osInfo,
    };
}
//# sourceMappingURL=helper.js.map