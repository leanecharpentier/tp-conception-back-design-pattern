type Cart = {
    totalAmount: number;
    totalWeightKg: number;
    itemCount: number;
};

// Interface Strategy

interface ShippingStrategy {
    calculate(cart: Cart): number;
    getName(): string;
}

// Strategies concretes

class EconomyShippingStrategy implements ShippingStrategy {
    public calculate(cart: Cart): number {
        // Frais de base + surcharge faible au poids
        const baseFee = 3.5;
        const weightFee = cart.totalWeightKg * 0.4;
        const raw = baseFee + weightFee;
        return Number(raw.toFixed(2));
    }

    public getName(): string {
        return "Economique";
    }
}

class ExpressShippingStrategy implements ShippingStrategy {
    public calculate(cart: Cart): number {
        // Frais plus eleves, mais gratuits au-dessus d'un seuil
        if (cart.totalAmount >= 120) {
            return 0;
        }
        const baseFee = 8;
        const itemFee = cart.itemCount * 0.75;
        const raw = baseFee + itemFee;
        return Number(raw.toFixed(2));
    }

    public getName(): string {
        return "Express";
    }
}

class PremiumShippingStrategy implements ShippingStrategy {
    public calculate(cart: Cart): number {
        // Livraison premium: forfait eleve, mais protection incluse
        const premiumFlatFee = 12;
        const insuranceFee = cart.totalAmount * 0.015;
        const raw = premiumFlatFee + insuranceFee;
        return Number(raw.toFixed(2));
    }

    public getName(): string {
        return "Premium";
    }
}

// Context

class ShippingCostCalculator {
    private strategy: ShippingStrategy;

    constructor(strategy: ShippingStrategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: ShippingStrategy): void {
        this.strategy = strategy;
    }

    public compute(cart: Cart): number {
        return this.strategy.calculate(cart);
    }

    public currentStrategyName(): string {
        return this.strategy.getName();
    }
}

// =========================
// Client
// =========================

const cart: Cart = {
    totalAmount: 89.9,
    totalWeightKg: 4.2,
    itemCount: 5,
};

const calculator = new ShippingCostCalculator(new EconomyShippingStrategy());

console.log("Panier:", cart);
console.log(
    `Strategie: ${calculator.currentStrategyName()} | Frais: ${calculator.compute(cart)} EUR`
);

calculator.setStrategy(new ExpressShippingStrategy());
console.log(
    `Strategie: ${calculator.currentStrategyName()} | Frais: ${calculator.compute(cart)} EUR`
);

calculator.setStrategy(new PremiumShippingStrategy());
console.log(
    `Strategie: ${calculator.currentStrategyName()} | Frais: ${calculator.compute(cart)} EUR`
);
