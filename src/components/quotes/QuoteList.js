import { Fragment } from 'react';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

import { useHistory, useLocation } from 'react-router-dom';

function sortQuotes(quotes, ascending){
  return quotes.sort((quotesA, quotesB)=>{
    if(ascending){
      return quotesA.author > quotesB.author ? 1 : -1;
    }else{
      return quotesA.author > quotesB.author ? -1 : 1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  //console.log(location);
  const queryParams = new URLSearchParams(location.search);
  const isAscending = queryParams.get('sort')==='asc';
  

  const sortedQuotes = sortQuotes(props.quotes, isAscending);

  //console.log(isAscending,sortedQuotes);

  const changeSortingHandler = ()=>{
    console.log('change');


    if(isAscending){
      history.push(`${location.pathname}?sort=desc`);
    }else{
      history.push(`${location.pathname}?sort=asc`);
    };
  };
  return (
    <Fragment>
    <div className={classes.sorting}>
      <button onClick={changeSortingHandler}>{isAscending ? 'sort desc' : 'sort asc'}</button>
    </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
