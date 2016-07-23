
export const formatTripName = (trip, short) => {
    return trip.destinations.map(des => des.tripDestination.cityName).join(',');
}
