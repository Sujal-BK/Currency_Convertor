import React from 'react'

export const DropDown = ({
    currencies,
    currency,
    setCurrency,
   
    title = " "
})=> {
  return (
    <div>
      {title}

      <div className='mt-1 relative'>
        <select  
        value={currency}
        onChange={(e)=>setCurrency(e.target.value)}
        className=' w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  focus: ring-2 focus:ring-indigo-500'>
            <hr />
            {currencies.map((currency)=>{
                return (
                    <option value={currency} key={currency}>{currency}</option>
                   
                )
            })}
        </select>

        
      </div>
    </div>

    
  )
}


