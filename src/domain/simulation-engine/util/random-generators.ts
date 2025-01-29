/**
 * Interface para geradores de números aleatórios.
 */
export interface RandomGeneratorI {
    next(): number;
}

/**
 * Classe que gera números aleatórios com distribuição normal (gaussiana).
 * A média é centralizada em 0.5 e o desvio padrão é ajustado para que ~99.7% dos valores estejam no intervalo [0, 1].
 */
export class GaussianRandom implements RandomGeneratorI {
    private nextVal: number | null = null;
    private mean: number = 0.5; // Média centralizada em 0.5
    private stdDev: number = 0.15; // Desvio padrão ajustado para ~99.7% dos valores em [0, 1]

    // Gera um valor com distribuição normal (média 0, desvio padrão 1)
    private nextGaussian(): number {
        if (this.nextVal !== null) {
            const value = this.nextVal;
            this.nextVal = null;
            return value;
        }

        let u, v, s: number;
        do {
            u = Math.random() * 2 - 1; // Intervalo [-1, 1)
            v = Math.random() * 2 - 1;
            s = u * u + v * v;
        } while (s >= 1 || s === 0);

        const multiplier = Math.sqrt(-2 * Math.log(s) / s);
        this.nextVal = v * multiplier;
        return u * multiplier;
    }

    public next(): number {
        // Gera um valor da distribuição normal padrão e ajusta média/desvio
        const gaussianValue = this.nextGaussian();
        const adjustedValue = gaussianValue * this.stdDev + this.mean;

        // Clipa o valor para garantir que esteja em [0, 1]
        return Math.max(0, Math.min(1, adjustedValue));
    }
}

/**
 * Classe que gera números aleatórios com distribuição uniforme no intervalo [0, 1).
 */
export class UniformRandom implements RandomGeneratorI {

    public next(): number {
        // Gera um número entre [min, max) usando Math.random()
        return Math.random();
    }
}

/**
 * Classe que gera números aleatórios com distribuição exponencial.
 * A taxa de decaimento (lambda) pode ser ajustada, e os valores gerados estão no intervalo [0, 1].
 */
export class ExponentialRandom implements RandomGeneratorI {
    private lambda: number;
    private maxValue: number;
    private scaleFactor: number;

    constructor(lambda: number = 2) {
        this.lambda = lambda;
        this.maxValue = 1; // Limite superior do intervalo [0, 1]
        this.scaleFactor = 1 - Math.exp(-this.lambda * this.maxValue);
    }

    public next(): number {
        const u = Math.random(); // Gera um valor uniforme entre (0, 1]
        
        // Aplica a transformação inversa da CDF truncada
        const exponentialValue = -Math.log(1 - u * this.scaleFactor) / this.lambda;
        
        return exponentialValue; // Já está no intervalo [0, 1]
    }
}





