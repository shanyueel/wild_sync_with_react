import { format } from "date-fns"

const transferTimestamp = (timestamp, outputFormat) => {
    if(timestamp){
      const timestampToNumber = Number(timestamp)
      const timeFormat = outputFormat || "yyyy.MM.dd HH:mm"
      const date = new Date(timestampToNumber)
      return format(date, timeFormat)
    }
    return
  }

  export {transferTimestamp}