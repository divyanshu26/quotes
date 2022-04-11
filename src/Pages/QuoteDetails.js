import { Link } from 'react-router-dom';
import {useParams, Route, useRouteMatch} from 'react-router-dom';
import Comments from '../components/comments/Comments';
import useHttp from '../hooks/use-http';
import {getSingleQuote} from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import { useEffect } from 'react';

const DUMMY_QUOTES = [
    {id:'q1', author:'Aparna', text:'JS is single threaded'},
    {id:'q2', author:'Divyanshu', text:'JS is single asynchronous'},
];


function QuoteDetails(){
const params = useParams();
const {quoteId} = params;

const {sendRequest,error,data:quote,status} = useHttp(getSingleQuote,true);
const route_match = useRouteMatch();
//console.log(quote,status,error);
//const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

useEffect(()=>{
    sendRequest(quoteId);
},[quoteId, sendRequest]);

if(status ==='pending'){
    return (
        <div className='centered'>
            <LoadingSpinner/>
        </div>
    );
};


if(error){
    return (
        <div className='centered'>
        {error}
    </div>
    );
}

if(!('author' in quote)){
    return (<div className='centered'>
        <h1>No Quote found !!</h1>
    </div>);
};


return (
    <>
        <HighlightedQuote text={quote.text} author={quote.author}/>
        <Route path={`/quotes/${params.quoteId}`} exact>
            <div className='centered'>
                <Link className='btn--flat' to={`${route_match.url}/comments`}>
                    Load Comments
                </Link>
            </div>
        </Route>
        <Route path={`${route_match.path}/comments`}>
            <Comments/>
        </Route>
    </>
);
};

export default QuoteDetails;