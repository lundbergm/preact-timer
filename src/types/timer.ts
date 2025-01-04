export interface Timer {
    title: string;
    description: string;
    warmUp: number;
    coolDown: number;
    loops: Loop[];
    restBetweenLoops: number;
}

export interface Loop {
    work: number;
    rest: number;
    cycles: number;
    sets: number;
    restBetweenSets: number;
}
