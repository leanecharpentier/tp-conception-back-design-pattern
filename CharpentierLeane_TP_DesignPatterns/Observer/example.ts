// Interface définissant le contrat pour les observateurs
interface Observer {
    update(productName: string, oldPrice: number, newPrice: number): void;
}

// Interface définissant le contrat pour le sujet observable
interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

// Classe produit (sujet concret) qui peut être observé
class Product implements Subject {
    private name: string;
    private price: number;
    private observers: Observer[] = [];

    constructor(name: string, initialPrice: number) {
        this.name = name;
        this.price = initialPrice;
    }

    public attach(observer: Observer): void {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
            console.log(`Nouvel observateur ajouté pour ${this.name}`);
        }
    }

    public detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
            this.observers.splice(index, 1);
            console.log(`Observateur retiré pour ${this.name}`);
        }
    }

    public notify(): void {
        // On notifie tous les observateurs enregistrés
        for (const observer of this.observers) {
            observer.update(this.name, this.price, this.price);
        }
    }

    public setPrice(newPrice: number): void {
        const oldPrice = this.price;
        if (oldPrice !== newPrice) {
            this.price = newPrice;
            console.log(`\n--- Prix de ${this.name} changé : ${oldPrice.toFixed(2)}€ → ${newPrice.toFixed(2)}€ ---`);
            // Notifier tous les observateurs du changement
            for (const observer of this.observers) {
                observer.update(this.name, oldPrice, newPrice);
            }
        }
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }
}

// Observateurs concrets
class EmailNotifier implements Observer {
    private email: string;

    constructor(email: string) {
        this.email = email;
    }

    public update(productName: string, oldPrice: number, newPrice: number): void {
        const change = newPrice - oldPrice;
        const percentage = ((change / oldPrice) * 100).toFixed(1);
        const direction = change > 0 ? "augmenté" : "diminué";
        
        console.log(`📧 Email envoyé à ${this.email}: Le prix de ${productName} a ${direction} de ${Math.abs(change).toFixed(2)}€ (${Math.abs(parseFloat(percentage))}%)`);
    }
}

class SMSNotifier implements Observer {
    private phoneNumber: string;

    constructor(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    public update(productName: string, oldPrice: number, newPrice: number): void {
        const change = newPrice - oldPrice;
        const direction = change > 0 ? "augmenté" : "diminué";
        
        console.log(`📱 SMS envoyé à ${this.phoneNumber}: ${productName} - Prix ${direction} : ${newPrice.toFixed(2)}€`);
    }
}

class PriceDropAlert implements Observer {
    private threshold: number;
    private email: string;

    constructor(email: string, threshold: number) {
        this.email = email;
        this.threshold = threshold;
    }

    public update(productName: string, oldPrice: number, newPrice: number): void {
        // Cet observateur ne réagit que si le prix baisse en dessous d'un seuil
        if (newPrice < oldPrice && newPrice <= this.threshold) {
            console.log(`🚨 ALERTE PRIX BAS pour ${this.email}: ${productName} est maintenant à ${newPrice.toFixed(2)}€ (seuil: ${this.threshold.toFixed(2)}€)`);
        }
    }
}

// Exemple d'utilisation
console.log("---- Système d'alertes de prix ----\n");

// Création d'un produit
const laptop = new Product("Laptop Gaming Pro", 1299.99);
console.log(`Produit créé : ${laptop.getName()} à ${laptop.getPrice().toFixed(2)}€\n`);

// Création d'observateurs
const aliceEmail = new EmailNotifier("alice@example.com");
const bobSMS = new SMSNotifier("+33 6 12 34 56 78");
const charlieAlert = new PriceDropAlert("charlie@example.com", 1000.00);

// Inscription des observateurs au produit
laptop.attach(aliceEmail);
laptop.attach(bobSMS);
laptop.attach(charlieAlert);

// Simulation de changements de prix
laptop.setPrice(1199.99); // Baisse de prix
laptop.setPrice(1099.99); // Nouvelle baisse (déclenche l'alerte de Charlie)
laptop.setPrice(1149.99); // Légère hausse

// Désinscription d'un observateur
console.log();
laptop.detach(bobSMS);

// Nouveau changement de prix (Bob ne sera plus notifié)
laptop.setPrice(999.99); // Baisse importante

// Ajout d'un nouvel observateur
console.log();
const dianaEmail = new EmailNotifier("diana@example.com");
laptop.attach(dianaEmail);

// Nouveau changement (Diana sera notifiée)
laptop.setPrice(1049.99);

