export class Rng {
    static generate(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
