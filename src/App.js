import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import Metrics from './pages/Metrics';
import SignIn from './pages/SignIn';
const Header = React.lazy(() => import('./container/Header'));

function App() {
  return (
    <div className="App bg-noclope-gray min-h-screen">
      <Suspense fallback={<Dimmer active inverted>
                            <Loader />
                        </Dimmer>}>
        <Header />
      </Suspense>
      <Switch>
        <Route path="/" exact component={Metrics} /> 
        <Route path="/SignIn" exact component={SignIn} /> 
      </Switch>
    </div>
  );
}

export default App;
