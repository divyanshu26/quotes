import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";



function AllQuotes() {
    const { sendRequest, status, data:  quotes,error } = useHttp(getAllQuotes,true);
    console.log('quotes', status, quotes);

    useEffect(() => {
        console.log('all quotes use efrfect');
        sendRequest();
    }, [sendRequest]);

    if(status === 'pending'){
        return (<div className="centered">
            <LoadingSpinner/>
        </div>);
    };

    if(error){
        return <p className="centered focused">{error}</p>;
    };

    if (status === 'completed' && (!quotes || quotes.length===0)){
        return <NoQuotesFound/>;
    }

    console.log('####',status,quotes);
    return (
        <>
            <QuoteList quotes={quotes} />
        </>
    );
};

export default AllQuotes;