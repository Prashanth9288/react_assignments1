import React from "react";
import { useState } from "react";

export default function CollegeFormWithUseState(){
  const[name,setName]=useState('')
  const[establishmentYear,setEstablishmentYear]=useState('')
  const[building,setBuilding]=useState('')
  const[street,setStreet]=useState('')
  const[pincode,setPincode]=useState('')
const [formData,setFormData]=useState({
  city:'',
  state:'',


})

const handleFormDataChange=(field,value)=>{
  setFormData({
    ...formData,
    [field]:value,
  });
};
  return(
    <div>
      <h2>College Form (useState version)</h2>

      <input type="text" 
             placeholder="College Name"
             value={name}
             onChange={(e)=>setName(e.target.value)} />
      <input type="number"
             placeholder="Establishment Year"
             value={establishmentYear}
             onChange={(e)=>setEstablishmentYear(e.target.value)}/>
      <input type="text"
             placeholder="Building"
             value={building}
             onChange={(e)=>setBuilding(e.target.value)}/>
      <input type="text" 
             placeholder="Street" 
             value={street}
             onChange={(e)=>setStreet(e.target.value)}/>
      <input type="number"
              placeholder="Pincode"
              value={pincode}
              onChange={(e)=>setPincode(e.target.value)}/>
      <input type="text"
             placeholder="City"
             value={formData.city}
             onChange={(e)=>handleFormDataChange('city',e.target.value)}/>
      <input type="text"
             placeholder="State"
             value={formData.state} 
             onChange={(e)=>handleFormDataChange('state',e.target.value)}/>

      <hr/>

      <h3>Preview</h3>
      <p>College Name:{name}</p>
      <p>Year:{establishmentYear}</p>
      <p>Building:{building}</p>
      <p>Street:{street}</p>
      <p>Area:{pincode}</p>
      <p>City:{formData.city}</p>
      <p>State:{formData.state}</p>
    </div>
  )
}