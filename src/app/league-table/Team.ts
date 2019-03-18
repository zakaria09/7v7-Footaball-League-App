export interface Team {
    // make most of these optional
    // until I have a solution
    name: string;
    matchesPlayed?: number;
    wins: number;
    draws?: number;
    loses?: number;
    points?: number;
    goalDiference?: number;
}