import AllQuotes from "./Pages/AllQuotes";
import NewQuote from "./Pages/NewQuotes";
import QuoteDetails from "./Pages/QuoteDetails";
import Layout from "./components/layout/Layout";
import NotFound from "./Pages/NotFound";

import {Route, Switch, Redirect} from "react-router-dom";


function App() {
  return (
    <>
     <Layout>
      <Switch>
      <Route path='/' exact>
        <Redirect to='/quotes'/>
      </Route>
      <Route path='/quotes' exact>
        <AllQuotes/>
      </Route>
      <Route path='/quotes/:quoteId'>
        <QuoteDetails/>
      </Route>
      <Route path='/new-quote'>
        <NewQuote/>
      </Route>
      <Route path='*'>
        <NotFound />
      </Route>
    </Switch>
     </Layout>
    </>
  );
}

export default App;
