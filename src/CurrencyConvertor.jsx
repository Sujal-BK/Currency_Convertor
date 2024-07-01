import React, { useEffect, useState } from 'react'
import { DropDown } from './DropDown';
import { HiArrowsRightLeft } from 'react-icons/hi2';

export const CurrencyConvertor = () => {
    const [currencies, setCurrencies] = useState([])
    const [amount, setAmount] = useState(1);
    const [fromCurrency,setFromCurrency] = useState("USD")
    const [toCurrency,setToCurrency] = useState("INR")
    const [conertedAmount,setConvertedAmount] = useState(null)
    const [converting,setConverting] = useState(false)

    const fetchCurrencies = async () => {
        try {
            const res = await fetch("https://api.frankfurter.app/currencies")
            const data = await res.json()

            setCurrencies(Object.keys(data))
        } catch (error) {
            console.error(error);

        }

    }

    useEffect(() => {
        fetchCurrencies();
    }, [])

    const currencyConvert = async ()=>{
        if(!amount) return true;
        setConverting(true)
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await res.json()


            setConvertedAmount(data.rates[toCurrency]+" "+ toCurrency)
        } catch (error) {
            console.error(error);

        }finally{
            setConverting(false)
        }
    }

    const handleFavourite = (currency) =>{

    }
    const swapCurrencies = () =>{
        setFromCurrency(toCurrency)
        setToCurrency(fromCurrency)
    }
    return (
        <div className='max-w-xl mx-auto my-10 p-5  bg-white rounded-lg shadow-lg'>
            <h2 className='text-gray-700   font-semibold text-4xl '>
                Currency Convertor
            </h2>

            <div className='text-left font-medium text-gray-700 flex flex-col   grid grid-cols-1  sm:grid-cols-3 gap-4 items-end '>
                
                <DropDown 
                currencies = {currencies} 
                currency={fromCurrency}
                setCurrency={setFromCurrency}
                title='From:' 
                handleFavourite={handleFavourite}/>

                <div className='flex justify-center '>
                    <button 
                    onClick={swapCurrencies}
                    className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                    <HiArrowsRightLeft className='text-xl text-gray-700'/>
                    </button>
                </div>
                <DropDown  
                currencies = {currencies} 
                currency={toCurrency}
                setCurrency={setToCurrency}
                title='To:'
                handleFavourite={handleFavourite}/>
            </div>

            <div className='mt-4'>
                <label htmlFor="amount"
                    className='block text-lg font-medium text-gray-700 text-left'
                >Amount</label>
                <input type="number" value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className='w-full p-2 border border-gray-300 focus:outline-none focus:ring-2 rounded-md shadow-sm ' />
            </div>

            <div className='flex justify-end my-3'>
                <button onClick={currencyConvert} className={`bg-indigo-600 px-5 py-2 text-white rounded-md text-lg  focus:ring-2 focus:ring-offset-2 hover:bg-indigo-700
                ${converting?"animate-pulse":""}
                `
                    
                }>convert</button>
            </div>
         { conertedAmount &&  <div className='mt-4 font-medium text-right text-green-600'>
                Converted Amount: {conertedAmount}
            </div>}
        </div>
    )
}


