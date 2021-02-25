
export interface Pair {
    owner: string; // a firebase uid
    id?: string;
    title: string;
    items: string[];
}

// TODO: how will I ever name my child
export interface DoComparison {
    timestamp: string; // ? long?
    id: string;
    pairId: string;
    result: boolean[]; // of length 0 -> (items.length) C 2
    currentIdx: number;
}