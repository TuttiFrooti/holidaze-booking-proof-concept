export default function SearchResult(cityPart, dateRange, guests, listOfRooms) {
  const [dateFrom, dateTo] = dateRange;

  if (cityPart && dateRange && guests) {
    return (listOfRooms.filter(room => {
      return (
        (parseInt(room.guests) >= parseInt(guests)) &&
        (Date.parse(room.reserveFrom) <= Date.parse(dateFrom)) &&
        (Date.parse(room.reserveTo) >= Date.parse(dateTo)) &&
        (room.cityArea.toLowerCase().includes(cityPart))
      );
    }))
  }
  else if (cityPart && guests) {
    return(
      listOfRooms.filter(room => {
        return (
          (parseInt(room.guests) >= parseInt(guests)) &&
          (room.cityArea.toLowerCase().includes(cityPart))
        )
      })
    )
  }
  else if (dateRange && guests) {
    return listOfRooms.filter(room => {
      return (
        (parseInt(room.guests) >= parseInt(guests)) &&
        (Date.parse(room.reserveFrom) <= Date.parse(dateFrom)) && 
        (Date.parse(room.reserveTo) >= Date.parse(dateTo))
      );
    })
  }
  else if (cityPart && dateRange) {
    return (listOfRooms.filter(room => {
      return (
        (Date.parse(room.reserveFrom) <= Date.parse(dateFrom)) &&
        (Date.parse(room.reserveTo) >= Date.parse(dateTo)) &&
        (room.cityArea.toLowerCase().includes(cityPart))
      );
    }))
  }
  else {
    return ([])
  }
}