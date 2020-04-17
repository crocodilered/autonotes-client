import emptyPhoto from '@/assets/autonotes.svg'


export function vehicleTitle (vehicle) {
  let title = `${vehicle.maker.title} ${vehicle.model.title}`
  // if (vehicle.year) title += ` ${vehicle.year}`
  return title
}


export function vehiclePhoto (vehicle) {
  return vehicle.photo
    ? vehicle.photo
    : emptyPhoto
}


export function vehicleRetrieveHref (vehicle) {
  return `/vehicles/${vehicle.id}/`
}


export function vehicleUpdateHref (vehicle) {
  return `/vehicles/${vehicle.id}/update/`
}


export function vehicleDeleteHref (vehicle) {
  return `/vehicles/${vehicle.id}/delete/`
}


export function vehicleCreateHref () {
  return `/vehicles/create/`
}

