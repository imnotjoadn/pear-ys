
export interface Pairwise {
    owner: string; // a firebase uid
    id?: string;
    title: string;
    items: string[];
}

// TODO: how will I ever name my child
// currentIdx: How far through the combinations
// result: bool is left or right. (number -> sliding scale, Positive vs Negative number)
// Combinations are deterministic.

// Store things in the same order, but on the client shuffle things around.
// result = [0, null, null, 1, null, null, 0];
// result = [null, null];
// Client side shuffling.
export interface DoComparison {
    owner: string; // a firebase uid
    timestamp: number; // ? long?
    id?: string; // Ref / Share later.
    pairId: string;
    result: boolean[]; // of length 0 -> (items.length) C 2
}