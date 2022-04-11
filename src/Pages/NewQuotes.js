import { useHistory } from "react-router-dom";
import { useEffect } from "react";

import QuoteForm from "../components/quotes/QuoteForm";

import useHttp from "../hooks/use-http";
import {addQuote} from '../lib/api';



function NewQuote(){
    console.log('quote new');
    const {sendRequest,status} = useHttp(addQuote);
    //console.log(history);
    const history = useHistory();
    
    
    const addQuoteHandler = (quoteData)=>{
        sendRequest(quoteData);
    };

    useEffect(()=>{
        if(status === 'completed'){
            history.push('/quotes?sort=asc');
        };
    },[status,history]);

    return (
        <QuoteForm isLoading={status==='pending'} onAddQuote={addQuoteHandler}/>
    );
};

export default NewQuote;