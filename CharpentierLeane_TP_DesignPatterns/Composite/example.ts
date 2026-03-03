// Composant commun

interface TrainingComponent {
    getName(): string;
    getDurationMinutes(): number;
    print(indentLevel?: number): void;
}

// Feuille

class Lesson implements TrainingComponent {
    private readonly name: string;
    private readonly durationMinutes: number;

    constructor(name: string, durationMinutes: number) {
        this.name = name;
        this.durationMinutes = durationMinutes;
    }

    public getName(): string {
        return this.name;
    }

    public getDurationMinutes(): number {
        return this.durationMinutes;
    }

    public print(indentLevel: number = 0): void {
        const indent = "  ".repeat(indentLevel);
        console.log(`${indent}- Leçon: ${this.name} (${this.durationMinutes} min)`);
    }
}

// Composite

class Module implements TrainingComponent {
    private readonly name: string;
    private readonly children: TrainingComponent[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public add(component: TrainingComponent): void {
        this.children.push(component);
    }

    public remove(component: TrainingComponent): void {
        const index = this.children.indexOf(component);
        if (index !== -1) {
            this.children.splice(index, 1);
        }
    }

    public getName(): string {
        return this.name;
    }

    public getDurationMinutes(): number {
        let total = 0;
        for (const child of this.children) {
            total += child.getDurationMinutes();
        }
        return total;
    }

    public print(indentLevel: number = 0): void {
        const indent = "  ".repeat(indentLevel);
        console.log(
            `${indent}+ Module: ${this.name} (${this.getDurationMinutes()} min)`
        );

        for (const child of this.children) {
            child.print(indentLevel + 1);
        }
    }
}

// Client

class TrainingCatalogService {
    public publish(component: TrainingComponent): void {
        console.log(`Publication de la formation: ${component.getName()}`);
        component.print();
        console.log(
            `Durée totale publiée: ${component.getDurationMinutes()} minutes\n`
        );
    }
}

// Démonstration

const introModule = new Module("Introduction à la relation client");
introModule.add(new Lesson("Comprendre le parcours client", 20));
introModule.add(new Lesson("Canaux de communication", 15));

const advancedSupportModule = new Module("Support client avancé");
advancedSupportModule.add(new Lesson("Gestion des escalades", 25));
advancedSupportModule.add(new Lesson("Traitement des objections", 30));

const rcsSpecializationModule = new Module("Spécialisation Messaging");
rcsSpecializationModule.add(new Lesson("Rédaction de messages RCS", 18));
rcsSpecializationModule.add(new Lesson("Suivi des KPI de campagne", 22));

const fullProgram = new Module("Parcours complet Customer Success");
fullProgram.add(introModule);
fullProgram.add(advancedSupportModule);
fullProgram.add(rcsSpecializationModule);

const catalogService = new TrainingCatalogService();
catalogService.publish(fullProgram);
