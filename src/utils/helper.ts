import os from 'os'
import { createHash } from 'crypto'
import { getDiskInfoSync } from 'node-disk-info'

export function getStableInstanceId() {
  const hostname = os.hostname()
  const bootTime = os.uptime() // in seconds since boot

  // Combine hostname + boot time in minutes
  const base = `${hostname}-${Math.floor(bootTime / 60)}`

  // Hash it for consistency
  const hash = createHash('sha256').update(base).digest('hex')
  return `inst-${hash.slice(0, 12)}`
}

export interface DiskInfo {
  path: string
  totalGB: number
  usedGB: number
  freeGB: number
  usedPercentage: string
}

export interface SystemInfo {
  cpu: {
    model: string
    speedMHz: number
    cores: number
  }
  memory: {
    totalMB: number
    freeMB: number
  }
  disk: DiskInfo
  os: {
    platform: string
    arch: string
    uptimeSeconds: number
  }
}

export function getSystemInfo(): SystemInfo {
  const cpus = os.cpus()

  const cpuInfo = {
    model: cpus?.[0]?.model || 'unknown',
    speedMHz: cpus?.[0]?.speed || 0,
    cores: cpus?.length || 0,
  }

  const memoryInfo = {
    totalMB: os.totalmem() / (1024 * 1024),
    freeMB: os.freemem() / (1024 * 1024),
  }

  let diskInfo: DiskInfo = {
    path: '',
    totalGB: 0,
    usedGB: 0,
    freeGB: 0,
    usedPercentage: '0%',
  }

  try {
    const disks = getDiskInfoSync()
    const primaryDisk = disks?.[0]
    if (primaryDisk) {
      diskInfo = {
        path: primaryDisk.mounted,
        totalGB: parseFloat(primaryDisk.blocks.toString()) / 1_000_000,
        usedGB: parseFloat(primaryDisk.used.toString()) / 1_000_000,
        freeGB: parseFloat(primaryDisk.available.toString()) / 1_000_000,
        usedPercentage: primaryDisk.capacity,
      }
    }
  } catch (err: any) {
    console.error('❌ Disk info failed:', err?.message || err)
  }

  const osInfo = {
    platform: os.platform(),
    arch: os.arch(),
    uptimeSeconds: os.uptime(),
  }

  return {
    cpu: cpuInfo,
    memory: memoryInfo,
    disk: diskInfo,
    os: osInfo,
  }
}