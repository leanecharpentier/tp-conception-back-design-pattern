// Interface définissant le contrat commun pour tous les filtres
interface PhotoFilter {
    apply(image: string): string;
    getName(): string;
}

// Classes concrètes implémentant l'interface PhotoFilter
class BlackWhiteFilter implements PhotoFilter {
    public apply(image: string): string {
        console.log("Application du filtre Noir & Blanc...");
        return `[Noir & Blanc] ${image}`;
    }

    public getName(): string {
        return "Noir & Blanc";
    }
}

class SepiaFilter implements PhotoFilter {
    public apply(image: string): string {
        console.log("Application du filtre Sépia...");
        return `[Sépia] ${image}`;
    }

    public getName(): string {
        return "Sépia";
    }
}

class VintageFilter implements PhotoFilter {
    public apply(image: string): string {
        console.log("Application du filtre Vintage...");
        return `[Vintage] ${image}`;
    }

    public getName(): string {
        return "Vintage";
    }
}

class HDRFilter implements PhotoFilter {
    public apply(image: string): string {
        console.log("Application du filtre HDR...");
        return `[HDR] ${image}`;
    }

    public getName(): string {
        return "HDR";
    }
}

// Classe Factory contenant la logique de création
class FilterFactory {
    public createFilter(type: string): PhotoFilter {
        switch (type.toLowerCase()) {
            case "noirblanc":
                return new BlackWhiteFilter();
            case "sepia":
                return new SepiaFilter();
            case "vintage":
                return new VintageFilter();
            case "hdr":
                return new HDRFilter();
            default:
                throw new Error(`Type de filtre inconnu : ${type}`);
        }
    }
}

// Exemple d'utilisation
console.log("---- Système de filtres photo ----\n");

const factory = new FilterFactory();

// Le code client n'a pas besoin de connaître les classes concrètes

// Ajout d'un filtre Sépia
const filter1 = factory.createFilter("sepia");
const image1 = filter1.apply("photo-vacances.jpg");
console.log(`Image traitée : ${image1}`);
console.log(`Filtre utilisé : ${filter1.getName()}\n`);

// Ajout d'un filtre Vintage
const filter2 = factory.createFilter("vintage");
const image2 = filter2.apply("portrait-famille.jpg");
console.log(`Image traitée : ${image2}`);
console.log(`Filtre utilisé : ${filter2.getName()}\n`);

// Ajout d'un filtre HDR
const filter3 = factory.createFilter("hdr");
const image3 = filter3.apply("paysage-montagne.jpg");
console.log(`Image traitée : ${image3}`);
console.log(`Filtre utilisé : ${filter3.getName()}\n`);
