import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const taiwanDistricts = require("data/taiwanDistricts.json")

const LocationInput = ({className, title, inputId, formContent, onFormChange, warning, detailed}) => {
  const detailRef = useRef(null)
  const defaultCounty = taiwanDistricts?.find(county => county.id === formContent?.[inputId]?.county) || taiwanDistricts?.[0]
  const [districts, setDistricts] = useState(defaultCounty?.districts)
  const [locationContent, setLocationContent] = useState(formContent?.[inputId]||{})
  const [warningContent, setWarningContent] = useState(warning)

  useEffect(()=>{
    setWarningContent(warning)
  },[warning])

  const setSelectedDistricts = () => {
    setLocationContent(formContent?.[inputId])
    const selectedCounty = taiwanDistricts?.find(county=>county.id === formContent?.[inputId]?.county)
    setDistricts(selectedCounty?.districts)
  }

  useEffect(()=>{
    setSelectedDistricts()
  },[formContent?.[inputId]])

  const handleCountySelect = (e) => {
    const selectedCounty = taiwanDistricts?.find(county=>county.id === e.target.value)
    const newLocation = {
      county: e.target.value,
      district: selectedCounty?.districts?.[0]?.id
    }

    if(JSON.stringify(newLocation !== JSON.stringify(locationContent))){
      setLocationContent(newLocation)
      const newForm = {
        ...formContent,
        [inputId]: newLocation
      }
      onFormChange(newForm)
    }
  }

  const handleDistrictSelect = (e) => {
    const newLocation = {
      ...locationContent,
      district: e.target.value
    }
    setLocationContent(newLocation)
    const newForm = {
      ...formContent,
      [inputId]: newLocation
    }
    onFormChange(newForm)
    
  }

  const handleDetailInput = () => {
    const newLocation = {
      ...locationContent,
      detail: detailRef.current.value
    }
    setLocationContent(newLocation)
    const newForm = {
      ...formContent,
      [inputId]: newLocation
    }
    onFormChange(newForm)
  }

  return(
    <div className={className}>
      {
        ( title || warningContent ) && 
        <div className="c-input-title">
          <label className="o-input-title__name">{title}</label>
          <label className="o-input-title__warning">{warningContent}</label>
        </div>
      }
      <div className="c-input-body">
        <select 
          className="o-location-input__county" 
          onChange={handleCountySelect} 
          value={locationContent?.["county"] || "default"}
        >
          <option value="default" disabled>縣市</option>
          { taiwanDistricts?.map( county => <option key={county?.id} value={county?.id}>{county?.name}</option> ) }
        </select>
        <select 
          className="o-location-input__district" 
          onChange={handleDistrictSelect} 
          disabled={!districts} 
          value={locationContent?.["district"] || "default"}
        >
          <option value="default" disabled>區域</option>
          { districts && districts?.map(district =><option key={district?.id} value={district?.id}>{district?.name}</option> ) }
        </select>
        {
          detailed &&
          <input
            className="o-location-input__address"
            type="text"
            ref={detailRef}
            placeholder="詳細地址 / 地標 / 道路"
            id="detail"
            value={locationContent?.detail || ""}
            onChange={handleDetailInput}
          />
        }
      </div>

    </div>
  )
}

const StyledLocationInput = styled(LocationInput)`
  width: 100%;

  .c-input-body{
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
    "county district"
    "address address";
    grid-gap: .5rem;

    select{
      width: 100%;
      min-width: 6rem;
    }

    .o-location-input{
      &__county{
        grid-area: county;
      }

      &__district{
        grid-area: district;
      }

      &__address{
        grid-area: address;
        width: 100%;
      }
    }
  }

  @media screen and (min-width: 1024px){
    .c-input-body{
      display: flex;

      .o-location-input{
        &__county,
        &__district{
          width: 5rem;
        }
      }
    }
  }
`

export default StyledLocationInput