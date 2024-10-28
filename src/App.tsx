import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import RecipeDetails from "./pages/RecipeDetails";
import Homepage from "./pages/HomePage";
import { RecipeProvider } from "./context/RecipeContext";

function App() {
  return (
    <div className="App">
      <RecipeProvider>
        <Router>
          <Switch>
            <Route path="/" exact component={Homepage} />
            <Route path="/recipe/:id" component={RecipeDetails} />
          </Switch>
        </Router>
      </RecipeProvider>
    </div>
  );
}

export default App;
