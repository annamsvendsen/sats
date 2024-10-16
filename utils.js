export function formaterTid(gruppetime) {
    return new Date(gruppetime.zonedStartTime.dateTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });
}

export function formaterDato(gruppetimer) {
    return new Date(gruppetimer[0].zonedStartTime.dateTime).toLocaleDateString('no-NO', {
        month: 'long',
        day: '2-digit'
    });
}