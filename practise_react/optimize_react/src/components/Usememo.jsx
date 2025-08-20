import React, { useMemo, useState } from "react";  
const ExpensiveComponent=()=>{
  const [amount,setAmount]=useState(0)
  const[age,setAge]=useState(21)

  const calculateInINR=(num)=>{
    console.log("converting...");
    return num*2;
  }
  const amountInINR=useMemo(()=>calculateInINR(amount),[amount])
  return(
    <div>
    <p>Amount in INR:{amountInINR}</p>
    <p>Age:{age}</p>
    <button onClick={()=>setAmount(amount+1)}>Increment Amount</button>
    <button onClick={()=>setAge(age+1)}>Increment Age</button>
    </div>
  )
}
export default ExpensiveComponent;