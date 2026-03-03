type SubscriptionStatus = "active" | "suspended";
type PlanName = "starter" | "pro" | "enterprise";

type Subscription = {
    id: string;
    customerName: string;
    status: SubscriptionStatus;
    plan: PlanName;
};

// Receiver

class SubscriptionService {
    private readonly subscriptions: Map<string, Subscription>;

    constructor(initialData: Subscription[]) {
        this.subscriptions = new Map(initialData.map((sub) => [sub.id, sub]));
    }

    public suspend(subscriptionId: string): void {
        const subscription = this.require(subscriptionId);
        subscription.status = "suspended";
        console.log(`[Receiver] Abonnement ${subscriptionId} suspendu.`);
    }

    public resume(subscriptionId: string): void {
        const subscription = this.require(subscriptionId);
        subscription.status = "active";
        console.log(`[Receiver] Abonnement ${subscriptionId} repris.`);
    }

    public changePlan(subscriptionId: string, newPlan: PlanName): void {
        const subscription = this.require(subscriptionId);
        subscription.plan = newPlan;
        console.log(
            `[Receiver] Abonnement ${subscriptionId} passe au plan ${newPlan}.`
        );
    }

    public snapshot(subscriptionId: string): Subscription {
        const current = this.require(subscriptionId);
        return { ...current };
    }

    public restore(state: Subscription): void {
        this.subscriptions.set(state.id, { ...state });
        console.log(`[Receiver] Etat restaure pour ${state.id}.`);
    }

    public print(subscriptionId: string): void {
        const sub = this.require(subscriptionId);
        console.log(
            `[Etat] ${sub.id} | client=${sub.customerName} | statut=${sub.status} | plan=${sub.plan}`
        );
    }

    private require(subscriptionId: string): Subscription {
        const subscription = this.subscriptions.get(subscriptionId);
        if (!subscription) {
            throw new Error(`Abonnement introuvable: ${subscriptionId}`);
        }
        return subscription;
    }
}

// Command interface

interface Command {
    execute(): void;
    undo(): void;
    getLabel(): string;
}

// Concrete Commands

class SuspendSubscriptionCommand implements Command {
    private readonly receiver: SubscriptionService;
    private readonly subscriptionId: string;
    private previousState?: Subscription;

    constructor(receiver: SubscriptionService, subscriptionId: string) {
        this.receiver = receiver;
        this.subscriptionId = subscriptionId;
    }

    public execute(): void {
        this.previousState = this.receiver.snapshot(this.subscriptionId);
        this.receiver.suspend(this.subscriptionId);
    }

    public undo(): void {
        if (this.previousState) {
            this.receiver.restore(this.previousState);
        }
    }

    public getLabel(): string {
        return `Suspend(${this.subscriptionId})`;
    }
}

class ResumeSubscriptionCommand implements Command {
    private readonly receiver: SubscriptionService;
    private readonly subscriptionId: string;
    private previousState?: Subscription;

    constructor(receiver: SubscriptionService, subscriptionId: string) {
        this.receiver = receiver;
        this.subscriptionId = subscriptionId;
    }

    public execute(): void {
        this.previousState = this.receiver.snapshot(this.subscriptionId);
        this.receiver.resume(this.subscriptionId);
    }

    public undo(): void {
        if (this.previousState) {
            this.receiver.restore(this.previousState);
        }
    }

    public getLabel(): string {
        return `Resume(${this.subscriptionId})`;
    }
}

class ChangePlanCommand implements Command {
    private readonly receiver: SubscriptionService;
    private readonly subscriptionId: string;
    private readonly newPlan: PlanName;
    private previousState?: Subscription;

    constructor(
        receiver: SubscriptionService,
        subscriptionId: string,
        newPlan: PlanName
    ) {
        this.receiver = receiver;
        this.subscriptionId = subscriptionId;
        this.newPlan = newPlan;
    }

    public execute(): void {
        this.previousState = this.receiver.snapshot(this.subscriptionId);
        this.receiver.changePlan(this.subscriptionId, this.newPlan);
    }

    public undo(): void {
        if (this.previousState) {
            this.receiver.restore(this.previousState);
        }
    }

    public getLabel(): string {
        return `ChangePlan(${this.subscriptionId} -> ${this.newPlan})`;
    }
}

// Invoker

class SubscriptionCommandBus {
    private readonly history: Command[] = [];

    public dispatch(command: Command): void {
        console.log(`[Invoker] Execution: ${command.getLabel()}`);
        command.execute();
        this.history.push(command);
    }

    public undoLast(): void {
        const command = this.history.pop();
        if (!command) {
            console.log("[Invoker] Rien a annuler.");
            return;
        }
        console.log(`[Invoker] Undo: ${command.getLabel()}`);
        command.undo();
    }
}

// Client

const receiver = new SubscriptionService([
    {
        id: "SUB-1001",
        customerName: "Acme Studio",
        status: "active",
        plan: "starter",
    },
]);

const invoker = new SubscriptionCommandBus();
const subscriptionId = "SUB-1001";

receiver.print(subscriptionId);

invoker.dispatch(new ChangePlanCommand(receiver, subscriptionId, "pro"));
receiver.print(subscriptionId);

invoker.dispatch(new SuspendSubscriptionCommand(receiver, subscriptionId));
receiver.print(subscriptionId);

invoker.dispatch(new ResumeSubscriptionCommand(receiver, subscriptionId));
receiver.print(subscriptionId);

console.log("\n--- Annulation des 2 dernieres commandes ---");
invoker.undoLast();
receiver.print(subscriptionId);

invoker.undoLast();
receiver.print(subscriptionId);
