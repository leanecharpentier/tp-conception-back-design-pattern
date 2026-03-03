type TripRequest = {
    travelerName: string;
    fromCity: string;
    toCity: string;
    departureDate: string;
    returnDate: string;
    nights: number;
    email: string;
    budget: number;
};

type TripBookingResult = {
    success: boolean;
    flightBookingId?: string;
    hotelBookingId?: string;
    paymentId?: string;
    totalPrice?: number;
    message: string;
};

// Sous-systemes complexes

class FlightService {
    public bookRoundTrip(
        fromCity: string,
        toCity: string,
        departureDate: string,
        returnDate: string
    ): { bookingId: string; price: number } {
        console.log(
            `[Flight] Reservation vol ${fromCity} -> ${toCity} (${departureDate} / ${returnDate})`
        );
        return {
            bookingId: `FL-${toCity.toUpperCase()}-2026`,
            price: 320,
        };
    }
}

class HotelService {
    public bookHotel(
        city: string,
        nights: number
    ): { bookingId: string; price: number } {
        console.log(`[Hotel] Reservation hotel a ${city} pour ${nights} nuit(s)`);
        return {
            bookingId: `HT-${city.toUpperCase()}-${nights}N`,
            price: nights * 90,
        };
    }
}

class PaymentService {
    public charge(email: string, amount: number): { paymentId: string; accepted: boolean } {
        console.log(`[Payment] Paiement de ${amount} EUR pour ${email}`);
        return {
            paymentId: `PAY-${Date.now()}`,
            accepted: amount <= 1500,
        };
    }
}

class NotificationService {
    public sendItinerary(email: string, summary: string): void {
        console.log(`[Notification] Itineraire envoye a ${email}`);
        console.log(`[Notification] Resume: ${summary}`);
    }
}

// Facade

class TravelBookingFacade {
    private readonly flightService: FlightService;
    private readonly hotelService: HotelService;
    private readonly paymentService: PaymentService;
    private readonly notificationService: NotificationService;

    constructor() {
        this.flightService = new FlightService();
        this.hotelService = new HotelService();
        this.paymentService = new PaymentService();
        this.notificationService = new NotificationService();
    }

    public bookTrip(request: TripRequest): TripBookingResult {
        console.log(`\n[Facade] Demarrage reservation pour ${request.travelerName}`);

        const flight = this.flightService.bookRoundTrip(
            request.fromCity,
            request.toCity,
            request.departureDate,
            request.returnDate
        );
        const hotel = this.hotelService.bookHotel(request.toCity, request.nights);

        const total = flight.price + hotel.price;
        if (total > request.budget) {
            return {
                success: false,
                message: `Budget insuffisant: total ${total} EUR > budget ${request.budget} EUR.`,
            };
        }

        const payment = this.paymentService.charge(request.email, total);
        if (!payment.accepted) {
            return {
                success: false,
                message: "Paiement refuse par le prestataire.",
            };
        }

        const summary = `Vol ${flight.bookingId}, Hotel ${hotel.bookingId}, Total ${total} EUR`;
        this.notificationService.sendItinerary(request.email, summary);

        return {
            success: true,
            flightBookingId: flight.bookingId,
            hotelBookingId: hotel.bookingId,
            paymentId: payment.paymentId,
            totalPrice: total,
            message: "Voyage reserve avec succes.",
        };
    }
}

// Client

const travelFacade = new TravelBookingFacade();

const tripOk: TripRequest = {
    travelerName: "Léane Charpentier",
    fromCity: "Paris",
    toCity: "Rome",
    departureDate: "2026-05-12",
    returnDate: "2026-05-18",
    nights: 6,
    email: "leane@example.com",
    budget: 1200,
};

const tripRejected: TripRequest = {
    travelerName: "Alex Martin",
    fromCity: "Lyon",
    toCity: "New York",
    departureDate: "2026-07-01",
    returnDate: "2026-07-08",
    nights: 7,
    email: "alex@example.com",
    budget: 500,
};

const result1 = travelFacade.bookTrip(tripOk);
console.log("[Resultat #1]", result1);

const result2 = travelFacade.bookTrip(tripRejected);
console.log("[Resultat #2]", result2);
