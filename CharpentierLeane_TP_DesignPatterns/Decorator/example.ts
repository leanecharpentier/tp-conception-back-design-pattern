// Interface définissant le contrat commun pour les livraisons
interface Delivery {
    getDescription(): string;
    getCost(): number;
}

// Composant concret : la livraison de base
class BasicDelivery implements Delivery {
    public getDescription(): string {
        return "Livraison standard";
    }

    public getCost(): number {
        return 5.00;
    }
}

// Classe décorateur abstraite
abstract class DeliveryDecorator implements Delivery {
    protected delivery: Delivery;

    constructor(delivery: Delivery) {
        this.delivery = delivery;
    }

    public getDescription(): string {
        return this.delivery.getDescription();
    }

    public getCost(): number {
        return this.delivery.getCost();
    }
}

// Décorateurs concrets
class ExpressDelivery extends DeliveryDecorator {
    public getDescription(): string {
        return this.delivery.getDescription() + " + Express (24h)";
    }

    public getCost(): number {
        return this.delivery.getCost() + 10.00;
    }
}

class InsuranceDecorator extends DeliveryDecorator {
    public getDescription(): string {
        return this.delivery.getDescription() + " + Assurance";
    }

    public getCost(): number {
        return this.delivery.getCost() + 3.50;
    }
}

class TrackingDecorator extends DeliveryDecorator {
    public getDescription(): string {
        return this.delivery.getDescription() + " + Suivi en temps réel";
    }

    public getCost(): number {
        return this.delivery.getCost() + 2.00;
    }
}

class GiftWrapDecorator extends DeliveryDecorator {
    public getDescription(): string {
        return this.delivery.getDescription() + " + Emballage cadeau";
    }

    public getCost(): number {
        return this.delivery.getCost() + 4.00;
    }
}

// Exemple d'utilisation
console.log("---- Exemples de livraisons avec options ----\n");

// Livraison de base uniquement
const basic = new BasicDelivery();
console.log(`Description : ${basic.getDescription()}`);
console.log(`Coût total : ${basic.getCost().toFixed(2)}€\n`);

// Livraison express
let express = new BasicDelivery();
express = new ExpressDelivery(express);

console.log(`Description : ${express.getDescription()}`);
console.log(`Coût total : ${express.getCost().toFixed(2)}€\n`);

// Livraison express + assurance
let expressWithInsurance = new BasicDelivery();
expressWithInsurance = new ExpressDelivery(expressWithInsurance);
expressWithInsurance = new InsuranceDecorator(expressWithInsurance);

console.log(`Description : ${expressWithInsurance.getDescription()}`);
console.log(`Coût total : ${expressWithInsurance.getCost().toFixed(2)}€\n`);

// Livraison avec toutes les options
let fullService = new BasicDelivery();
fullService = new ExpressDelivery(fullService);
fullService = new TrackingDecorator(fullService);
fullService = new InsuranceDecorator(fullService);
fullService = new GiftWrapDecorator(fullService);

console.log(`Description : ${fullService.getDescription()}`);
console.log(`Coût total : ${fullService.getCost().toFixed(2)}€\n`);

// On peut aussi combiner différemment : base + suivi + emballage cadeau (sans express)
let customDelivery = new BasicDelivery();
customDelivery = new TrackingDecorator(customDelivery);
customDelivery = new GiftWrapDecorator(customDelivery);

console.log(`Description : ${customDelivery.getDescription()}`);
console.log(`Coût total : ${customDelivery.getCost().toFixed(2)}€\n`);

