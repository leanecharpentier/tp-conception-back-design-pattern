// Contrat State

interface TicketState {
    assign(agentName: string): void;
    requestCustomerInfo(): void;
    resolve(): void;
    reopen(): void;
    getName(): string;
}

// Context

class SupportTicket {
    private readonly id: string;
    private readonly subject: string;
    private assignedAgent: string | null = null;
    private state: TicketState;

    constructor(id: string, subject: string) {
        this.id = id;
        this.subject = subject;
        this.state = new NewState(this);
    }

    public setState(state: TicketState): void {
        console.log(`[Transition] ${this.state.getName()} -> ${state.getName()}`);
        this.state = state;
    }

    public setAssignedAgent(agentName: string): void {
        this.assignedAgent = agentName;
    }

    public getAssignedAgent(): string | null {
        return this.assignedAgent;
    }

    public getId(): string {
        return this.id;
    }

    public getSubject(): string {
        return this.subject;
    }

    public getStateName(): string {
        return this.state.getName();
    }

    // Actions deleguees a l'etat courant
    public assign(agentName: string): void {
        this.state.assign(agentName);
    }

    public requestCustomerInfo(): void {
        this.state.requestCustomerInfo();
    }

    public resolve(): void {
        this.state.resolve();
    }

    public reopen(): void {
        this.state.reopen();
    }
}

// Etats concrets

class NewState implements TicketState {
    private readonly ticket: SupportTicket;

    constructor(ticket: SupportTicket) {
        this.ticket = ticket;
    }

    public assign(agentName: string): void {
        this.ticket.setAssignedAgent(agentName);
        console.log(
            `[New] Ticket ${this.ticket.getId()} assigné à ${agentName}.`
        );
        this.ticket.setState(new InProgressState(this.ticket));
    }

    public requestCustomerInfo(): void {
        console.log("[New] Impossible: ticket non assigné.");
    }

    public resolve(): void {
        console.log("[New] Impossible: le ticket doit être traité avant résolution.");
    }

    public reopen(): void {
        console.log("[New] Déjà ouvert.");
    }

    public getName(): string {
        return "Nouveau";
    }
}

class InProgressState implements TicketState {
    private readonly ticket: SupportTicket;

    constructor(ticket: SupportTicket) {
        this.ticket = ticket;
    }

    public assign(agentName: string): void {
        this.ticket.setAssignedAgent(agentName);
        console.log(`[InProgress] Reaffectation du ticket à ${agentName}.`);
    }

    public requestCustomerInfo(): void {
        console.log("[InProgress] Demande d'informations envoyée au client.");
        this.ticket.setState(new WaitingCustomerState(this.ticket));
    }

    public resolve(): void {
        console.log(
            `[InProgress] Ticket résolu par ${this.ticket.getAssignedAgent()}.`
        );
        this.ticket.setState(new ResolvedState(this.ticket));
    }

    public reopen(): void {
        console.log("[InProgress] Déjà en cours.");
    }

    public getName(): string {
        return "En cours";
    }
}

class WaitingCustomerState implements TicketState {
    private readonly ticket: SupportTicket;

    constructor(ticket: SupportTicket) {
        this.ticket = ticket;
    }

    public assign(agentName: string): void {
        this.ticket.setAssignedAgent(agentName);
        console.log(`[WaitingCustomer] Reaffectation du ticket à ${agentName}.`);
    }

    public requestCustomerInfo(): void {
        console.log("[WaitingCustomer] Demande déjà en attente de réponse client.");
    }

    public resolve(): void {
        console.log(
            "[WaitingCustomer] Résolution impossible avant retour du client."
        );
    }

    public reopen(): void {
        console.log(
            "[WaitingCustomer] Réponse client recue, reprise du traitement."
        );
        this.ticket.setState(new InProgressState(this.ticket));
    }

    public getName(): string {
        return "En attente client";
    }
}

class ResolvedState implements TicketState {
    private readonly ticket: SupportTicket;

    constructor(ticket: SupportTicket) {
        this.ticket = ticket;
    }

    public assign(agentName: string): void {
        console.log(
            `[Resolved] Ticket déjà fermé. Reouverture requise avant reaffectation à ${agentName}.`
        );
    }

    public requestCustomerInfo(): void {
        console.log("[Resolved] Action non applicable sur un ticket résolu.");
    }

    public resolve(): void {
        console.log("[Resolved] Ticket déjà résolu.");
    }

    public reopen(): void {
        console.log("[Resolved] Ticket réouvert.");
        this.ticket.setState(new InProgressState(this.ticket));
    }

    public getName(): string {
        return "Résolu";
    }
}

// Demonstration

const ticket = new SupportTicket("TCK-2026-1042", "Erreur de facturation");

console.log(
    `Ticket ${ticket.getId()} (${ticket.getSubject()}) - État initial: ${ticket.getStateName()}`
);

ticket.requestCustomerInfo(); // interdit en "Nouveau"
ticket.assign("Léane");
ticket.requestCustomerInfo();
ticket.resolve(); // interdit en attente client
ticket.reopen(); // reprise de traitement
ticket.resolve();
ticket.assign("Alex"); // interdit en résolu
ticket.reopen();
ticket.assign("Alex");

console.log(`État final du ticket: ${ticket.getStateName()}`);
