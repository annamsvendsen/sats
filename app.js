import { formaterTid } from "./utils.js";

//Henter data fra JSON-fila og omgjør til javascript
fetch('gruppetimedata.json')
    .then((response) => {
        if (!response.ok) throw new Error('Feilet ved fetching av data');
        return response.text();
    })
    .then((text) => {
        const data = JSON.parse(text);
        visGruppetimer(data.results);
    })
    .catch((error) => console.error('Error:', error));

// Funksjon som viser gruppetimene på nettsiden
function visGruppetimer(gruppetimer) {
    const gruppetimeInnhold = document.getElementById('gruppetimer');
    const formatertDato = new Date(gruppetimer[0].zonedStartTime.dateTime).toLocaleDateString('no-NO', {
        month: 'long',
        day: '2-digit'
    });
    gruppetimeInnhold.innerHTML = `<h2>${formatertDato}</h2>`;

    //Itererer gjennom alle gruppetimene
    gruppetimer.forEach((gruppetime) => {
        const formatertTid = formaterTid(gruppetime);
        const ledigePlasser = gruppetime.bookingInfo.capacity - gruppetime.bookingInfo.bookedCount;
        const bookingStatus = gruppetime.bookingInfo.memberBookingInfo.bookingState;

        // Legger til alle timene i div
        gruppetimeInnhold.innerHTML += `
        <div class="gruppetimer">
            <div>
                <div class="tidOgVarighet">
                    <b>${formatertTid}</b>
                    <p>${gruppetime.durationInMinutes} min</p>
                </div>
                <h2>${gruppetime.name}</h2>
                <p">med ${gruppetime.instructor}</p>
                <p>${gruppetime.clubName} - 
                ${ledigePlasser > 1 
                ? `${ledigePlasser} ledige plasser` 
                : ledigePlasser === 1 
                    ? `1 ledig plass` 
                    : `${gruppetime.bookingInfo.waitingListCount} på venteliste`}
                </p>
            </div>
            <div class="knapper">
                ${gruppetime.bookingInfo.bookedCount === gruppetime.bookingInfo.capacity ?
                `<button class="ventelisteKnapp">Stå på venteliste</button>` :
                `<button class="bookingKnapp">${bookingStatus === "Booked" ? "Meld av" : "Book"}</button>`
                }
                ${gruppetime.bookingInfo.memberBookingInfo.bookingState === "NotBooked" && gruppetime.bookingInfo.memberBookingInfo.waitingListPosition > 0 
                    ? `<p>Du er på ventelisteplass nummer ${gruppetime.bookingInfo.memberBookingInfo.waitingListPosition}</p>` 
                    : ''
                }
            </div>
        </div>
        `;
    });
}