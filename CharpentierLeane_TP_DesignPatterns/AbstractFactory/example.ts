// Produits abstraits

interface EmploymentContract {
    generate(employeeName: string): string;
}

interface Payslip {
    generate(employeeName: string, grossSalary: number): string;
}

interface TaxReport {
    generate(employeeName: string, grossSalary: number): string;
}

// Fabrique abstraite

interface PayrollFactory {
    createContract(): EmploymentContract;
    createPayslip(): Payslip;
    createTaxReport(): TaxReport;
}

// Produits concrets - France

class FranceEmploymentContract implements EmploymentContract {
    public generate(employeeName: string): string {
        return `Contrat FR pour ${employeeName} (CDI, droit du travail français).`;
    }
}

class FrancePayslip implements Payslip {
    public generate(employeeName: string, grossSalary: number): string {
        const socialContributions = grossSalary * 0.22;
        const netSalary = grossSalary - socialContributions;
        return `Bulletin FR - ${employeeName} | Brut: ${grossSalary.toFixed(2)} EUR | Cotisations: ${socialContributions.toFixed(2)} EUR | Net: ${netSalary.toFixed(2)} EUR`;
    }
}

class FranceTaxReport implements TaxReport {
    public generate(employeeName: string, grossSalary: number): string {
        const taxableBase = grossSalary * 0.9;
        return `Déclaration fiscale FR - ${employeeName} | Base imposable: ${taxableBase.toFixed(2)} EUR`;
    }
}

// Produits concrets - Canada

class CanadaEmploymentContract implements EmploymentContract {
    public generate(employeeName: string): string {
        return `Employment contract CA for ${employeeName} (provincial + federal compliance).`;
    }
}

class CanadaPayslip implements Payslip {
    public generate(employeeName: string, grossSalary: number): string {
        const deductions = grossSalary * 0.18;
        const netSalary = grossSalary - deductions;
        return `Payslip CA - ${employeeName} | Gross: ${grossSalary.toFixed(2)} CAD | Deductions: ${deductions.toFixed(2)} CAD | Net: ${netSalary.toFixed(2)} CAD`;
    }
}

class CanadaTaxReport implements TaxReport {
    public generate(employeeName: string, grossSalary: number): string {
        const taxableIncome = grossSalary * 0.88;
        return `Tax report CA - ${employeeName} | Taxable income: ${taxableIncome.toFixed(2)} CAD`;
    }
}

// Fabriques concrètes

class FrancePayrollFactory implements PayrollFactory {
    public createContract(): EmploymentContract {
        return new FranceEmploymentContract();
    }

    public createPayslip(): Payslip {
        return new FrancePayslip();
    }

    public createTaxReport(): TaxReport {
        return new FranceTaxReport();
    }
}

class CanadaPayrollFactory implements PayrollFactory {
    public createContract(): EmploymentContract {
        return new CanadaEmploymentContract();
    }

    public createPayslip(): Payslip {
        return new CanadaPayslip();
    }

    public createTaxReport(): TaxReport {
        return new CanadaTaxReport();
    }
}

// Client

class PayrollDocumentService {
    private readonly factory: PayrollFactory;

    constructor(factory: PayrollFactory) {
        this.factory = factory;
    }

    public generateEmployeeFile(employeeName: string, grossSalary: number): void {
        const contract = this.factory.createContract();
        const payslip = this.factory.createPayslip();
        const taxReport = this.factory.createTaxReport();

        console.log(contract.generate(employeeName));
        console.log(payslip.generate(employeeName, grossSalary));
        console.log(taxReport.generate(employeeName, grossSalary));
    }
}

function getFactoryByCountry(country: string): PayrollFactory {
    switch (country.toLowerCase()) {
        case "france":
            return new FrancePayrollFactory();
        case "canada":
            return new CanadaPayrollFactory();
        default:
            throw new Error(`Pays non supporté: ${country}`);
    }
}

// Démonstration

console.log("===== Dossier de paie - Employée en France =====");
const franceService = new PayrollDocumentService(getFactoryByCountry("france"));
franceService.generateEmployeeFile("Alice Martin", 4200);

console.log("\n===== Dossier de paie - Employee au Canada =====");
const canadaService = new PayrollDocumentService(getFactoryByCountry("canada"));
canadaService.generateEmployeeFile("Noah Tremblay", 5100);
