import taiwanDistricts from 'data/taiwanDistricts.json'

export const displayLocation = ( location ) => {
  const districtsWithThreeWords = ["605", "849", "901", "963"]
  const locationCounty = taiwanDistricts?.find(county=>county?.id === location?.county)
  const locationDistrict = locationCounty?.districts?.find(district=> district?.id === location?.district)

  if(location?.detail && !districtsWithThreeWords.some(id => id === location?.district)){
    return `${locationCounty?.name?.slice(0,2)}${locationDistrict?.name?.slice(0,2)} ${location?.detail}`  
  }else if(location?.detail && districtsWithThreeWords.some(location?.district)){
    return `${locationCounty?.name?.slice(0,2)}${locationDistrict?.name?.slice(0,3)} ${location?.detail}`
  }else{
    return `${locationCounty?.name}${locationDistrict?.name}`
  }
}

export const displayRegion = ( location ) => {
  const locationCounty = taiwanDistricts?.find(county=>county?.id === location?.county)
  const locationDistrict = locationCounty?.districts?.find(district=> district?.id === location?.district)

  if(location?.detail && location.district === "849"){
    return `${locationCounty?.name?.slice(0,2)}${locationDistrict?.name?.slice(0,3)}`  
  }else{
    return `${locationCounty?.name?.slice(0,2)}${locationDistrict?.name?.slice(0,2)}`
  }
}
