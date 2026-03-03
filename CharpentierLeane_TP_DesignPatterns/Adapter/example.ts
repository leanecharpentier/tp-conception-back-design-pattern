// Format interne de l'application

type RichCard = {
    title: string;
    description: string;
    imageUrl: string;
    ctaLabel: string;
    ctaUrl: string;
};

type InternalRcsMessage = {
    campaignId: string;
    sender: string;
    recipient: string;
    text: string;
    richCard?: RichCard;
};

// Interface cible (attendue par le client)

interface RcsProvider {
    send(message: InternalRcsMessage): { provider: string; externalMessageId: string };
}

// APIs externes incompatibles (Adaptee)

class VonageRcsApi {
    public dispatchRcs(payload: {
        from: string;
        to: string;
        content: {
            text: string;
            card?: {
                headline: string;
                body: string;
                media: string;
                actionText: string;
                actionUrl: string;
            };
        };
        metadata: {
            campaign_reference: string;
        };
    }): { message_uuid: string } {
        console.log("[Vonage API] Payload reçu:", JSON.stringify(payload, null, 2));
        return {
            message_uuid: `vng-${payload.metadata.campaign_reference}`,
        };
    }
}

class CmRcsApi {
    public submitMessage(payload: {
        source: string;
        destination: string;
        bodyText: string;
        suggestion?: {
            title: string;
            text: string;
            mediaUrl: string;
            button: {
                label: string;
                link: string;
            };
        };
        tags: string[];
    }): { trackingCode: string } {
        console.log("[CM API] Payload reçu:", JSON.stringify(payload, null, 2));
        return {
            trackingCode: `cm-${payload.tags.join("-")}`,
        };
    }
}

// Adaptateurs

class VonageAdapter implements RcsProvider {
    private readonly vonageApi: VonageRcsApi;

    constructor(vonageApi: VonageRcsApi) {
        this.vonageApi = vonageApi;
    }

    public send(message: InternalRcsMessage): { provider: string; externalMessageId: string } {
        const payload = {
            from: message.sender,
            to: message.recipient,
            content: {
                text: message.text,
                card: message.richCard
                    ? {
                          headline: message.richCard.title,
                          body: message.richCard.description,
                          media: message.richCard.imageUrl,
                          actionText: message.richCard.ctaLabel,
                          actionUrl: message.richCard.ctaUrl,
                      }
                    : undefined,
            },
            metadata: {
                campaign_reference: message.campaignId,
            },
        };

        const result = this.vonageApi.dispatchRcs(payload);

        return {
            provider: "Vonage",
            externalMessageId: result.message_uuid,
        };
    }
}

class CmAdapter implements RcsProvider {
    private readonly cmApi: CmRcsApi;

    constructor(cmApi: CmRcsApi) {
        this.cmApi = cmApi;
    }

    public send(message: InternalRcsMessage): { provider: string; externalMessageId: string } {
        const payload = {
            source: message.sender,
            destination: message.recipient,
            bodyText: message.text,
            suggestion: message.richCard
                ? {
                      title: message.richCard.title,
                      text: message.richCard.description,
                      mediaUrl: message.richCard.imageUrl,
                      button: {
                          label: message.richCard.ctaLabel,
                          link: message.richCard.ctaUrl,
                      },
                  }
                : undefined,
            tags: [message.campaignId, "rcs"],
        };

        const result = this.cmApi.submitMessage(payload);

        return {
            provider: "CM",
            externalMessageId: result.trackingCode,
        };
    }
}

// Client métier

class RcsCampaignService {
    private readonly provider: RcsProvider;

    constructor(provider: RcsProvider) {
        this.provider = provider;
    }

    public sendCampaign(message: InternalRcsMessage): void {
        console.log(
            `Envoi campagne ${message.campaignId} vers ${message.recipient}...`
        );

        const response = this.provider.send(message);

        console.log(
            `Message envoyé via ${response.provider}. ID externe: ${response.externalMessageId}\n`
        );
    }
}

function selectProvider(providerName: string): RcsProvider {
    switch (providerName.toLowerCase()) {
        case "vonage":
            return new VonageAdapter(new VonageRcsApi());
        case "cm":
            return new CmAdapter(new CmRcsApi());
        default:
            throw new Error(`Provider non supporté: ${providerName}`);
    }
}

// Démonstration

const baseMessage: InternalRcsMessage = {
    campaignId: "SPRING-2026",
    sender: "MonShop",
    recipient: "+33612000000",
    text: "Promo de printemps: -20% jusqu'à dimanche.",
    richCard: {
        title: "Offre spéciale printemps",
        description: "Profitez de nos remises exclusives cette semaine.",
        imageUrl: "https://cdn.monshop.fr/spring-2026.jpg",
        ctaLabel: "J'en profite",
        ctaUrl: "https://monshop.fr/offres/printemps",
    },
};

const vonageService = new RcsCampaignService(selectProvider("vonage"));
vonageService.sendCampaign(baseMessage);

const cmService = new RcsCampaignService(selectProvider("cm"));
cmService.sendCampaign(baseMessage);
