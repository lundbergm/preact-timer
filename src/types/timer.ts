export interface Timer {
    id: string;
    created;
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
