class ImprimanteBureau {
    private static instance: ImprimanteBureau | null = null;

    private constructor() {
        console.log("Initialisation de l'imprimante physique...");
    }

    public static getInstance(): ImprimanteBureau {
        if (ImprimanteBureau.instance === null) {
            ImprimanteBureau.instance = new ImprimanteBureau();
        }
        return ImprimanteBureau.instance;
    }

    public imprimer(document: string): void {
        console.log(`Impression en cours : ${document}`);
    }
}

const imprimante1 = ImprimanteBureau.getInstance();
imprimante1.imprimer("Rapport annuel.pdf");

const imprimante2 = ImprimanteBureau.getInstance();
imprimante2.imprimer("Facture_Client_42.pdf");

if (imprimante1 === imprimante2) {
    console.log("Succès : Les deux variables partagent la même instance.");
} else {
    console.log("Erreur : Deux instances différentes ont été créées.");
}