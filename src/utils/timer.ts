import { Timer } from '../types/timer';

export function getTimerStats(timer: Timer): { totalTime: string } {
    const { warmUp, coolDown, loops, restBetweenLoops } = timer;
    const loopStats = loops.map((loop) => {
        const { work, rest, cycles, sets, restBetweenSets } = loop;
        const loopTime = work * cycles * sets + rest * cycles * (sets - 1) + restBetweenSets * (sets - 1);
        return loopTime;
    });
    const totalLoopTime = loopStats.reduce((acc, time) => acc + time, 0);
    const totalTime = warmUp + coolDown + totalLoopTime + restBetweenLoops * (loops.length - 1);
    return { totalTime: formatTime(totalTime) };
}

export function formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export function getTimerTime(timer: Timer): { seconds: number; formattedTime: string } {
    const { warmUp, coolDown, loops, restBetweenLoops } = timer;
    const loopStats = loops.map((loop) => {
        const { work, rest, cycles, sets, restBetweenSets } = loop;
        const loopTime = work * cycles * sets + rest * cycles * (sets - 1) + restBetweenSets * (sets - 1);
        return loopTime;
    });
    const totalLoopTime = loopStats.reduce((acc, time) => acc + time, 0);
    const totalTime = warmUp + coolDown + totalLoopTime + restBetweenLoops * (loops.length - 1);
    return { seconds: totalTime, formattedTime: formatTime(totalTime) };
}
