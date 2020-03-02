export class Rng {
    static generate(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}