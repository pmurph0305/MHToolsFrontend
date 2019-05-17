import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CBT from "../CBT/CBT";
import CopingSkills from "../CopingSkills/CopingSkills";
import DailyMaintenance from "../DailyMaintenance/DailyMaintenance";
import History from "../History/History";
import NavBar from "../../Components/Navigation/NavBar";
import PHQ9 from "../PHQ9/PHQ9";

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  PHQ9 = () => {
    console.log("phq9");
    console.log(this.props);
    return (
      <PHQ9
        onSubmitPHQ9={answers => this.props.onSubmitPHQ9}
        submissionResult={this.props.submissionResult}
      />
    );
  };

  CBT = () => {
    return <CBT />;
  };

  DailyMaintenance = () => {
    return <DailyMaintenance />;
  };

  History = () => {
    return <History />;
  };

  CopingSkills = () => {
    return <CopingSkills />;
  };

  Home = () => {
    return <div>Home.</div>;
  };

  render() {
    return (
      <Router>
        <NavBar onModalChange={this.props.onModalChange} />
        <Route exact path="/" component={this.Home} />
        <Route path="/cbt" component={CBT} />
        <Route path="/coping" component={CopingSkills} />
        <Route path="/dm" component={DailyMaintenance} />
        <Route path="/hist" component={History} />
        <Route
          path="/phq9"
          render={routeProps => (
            <PHQ9
              {...routeProps}
              onSubmitPHQ9={this.props.onSubmitPHQ9}
              submissionResult={this.props.submissionResult}
            />
          )}
        />
      </Router>
    );
  }
}

export default AppRouter;
