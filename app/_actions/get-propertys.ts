"use server"

import { db } from "../_lib/prisma"

interface GetPropertyProps {
  serviceId: string
  date: Date
}

export const getProperty = ({}: GetPropertyProps) => {
  return db.property.findMany({
    where: {
      recommended: true,
    },
  })
}
