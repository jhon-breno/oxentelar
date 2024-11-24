import { PropertyReservations } from "@prisma/client"

interface UserReservationItemPros {
  reservation: PropertyReservations
}

const UserReservationItem = ({ reservation }: UserReservationItemPros) => {
  return (
    <div>
      <h1>reserva</h1>
    </div>
  )
}

export default UserReservationItem
