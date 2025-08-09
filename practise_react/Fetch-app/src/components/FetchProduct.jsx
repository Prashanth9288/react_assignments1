import React from "react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
 export default function FetchProduct(){
  const [products,setProducts]=useState()

   useEffect(()=>{
     axios.get("https://jsonexamples.com/products")
    .then(response=>setProducts(response.data))
    .catch(error=>console.log(error))
    
   },[])
   console.log(products)

   if(!products)
   return <p>Loading........</p>

   return(
    <div>
      <p><strong>Brand:{products.brand}</strong></p>
      console.log({`products.brand`})
    </div>
   )
}