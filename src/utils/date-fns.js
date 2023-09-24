import { format } from "date-fns"

export const transferTimestamp = (timestamp, outputFormat) => {
  if(timestamp){
    const timestampToNumber = Number(timestamp)
    const timeFormat = outputFormat || "yyyy.MM.dd HH:mm"
    const date = new Date(timestampToNumber)
    return format(date, timeFormat)
  }
  return
}

export const calculateAge = (birthTimeStamp) => {
  const currentTimeStamp = Date.now()
  const age = Math.floor((currentTimeStamp - birthTimeStamp) / (1000 * 60 * 60 * 24 * 365.25))
  return age
}