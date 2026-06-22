export function smallTimeHandling(tempTime: number, briefTime: boolean) {
    if (briefTime) {
        if (tempTime >= 60 * 60 * 24) {
            const day = Math.floor(tempTime / (60 * 60 * 24))
            return `${String(day)}天`
        } else if (tempTime >= 60 * 60) {
            const hour = Math.floor(tempTime / (60 * 60))
            return `${String(hour)}小时`
        } else if (tempTime >= 60) {
            const minute = Math.floor(tempTime / 60)
            return `${String(minute)}分`
        } else {
            return `${String(tempTime)}秒`
        }
    } else {
        if (tempTime >= 60 * 60 * 24) {
            const leftSec2 = tempTime % (60 * 60 * 24)
            const leftSec = leftSec2 % 3600
            const day = Math.floor(tempTime / (60 * 60 * 24))
            const hour = Math.floor(leftSec2 / (60 * 60))
            const minute = Math.floor(leftSec / 60)
            const second = Math.ceil(leftSec % 60)
            return `${String(day).padStart(2, '0')}:${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
        } else if (tempTime >= 60 * 60) {
            const leftSec = tempTime % 3600
            const hour = Math.floor(tempTime / (60 * 60))
            const minute = Math.floor(leftSec / 60)
            const second = Math.ceil(leftSec % 60)
            return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
        } else if (tempTime >= 60) {
            const minute = Math.floor(tempTime / 60)
            const second = Math.ceil(tempTime % 60)
            return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`
        } else {
            return `00:${String(tempTime).padStart(2, '0')}`
        }
    }
}

export function hourMinuteSecond2Second(hour: number, minute: number, second: number) {
    return Number(hour) * 60 * 60 + Number(minute) * 60 + Number(second)
}
