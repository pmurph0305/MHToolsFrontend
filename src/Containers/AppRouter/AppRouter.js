import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

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

  PHQ9 = routeProps => {
    return (
      <PHQ9
        {...routeProps}
        onSubmitPHQ9={this.props.onSubmitPHQ9}
        submissionResult={this.props.submissionResult}
      />
    );
  };

  CBT = routeProps => {
    return <CBT />;
  };

  DailyMaintenance = () => {
    return <DailyMaintenance />;
  };

  History = routeProps => {
    return <History />;
  };

  CopingSkills = routeProps => {
    return <CopingSkills />;
  };

  Home = routeProps => {
    return <div>Home.</div>;
  };

  render() {
    return (
      <Router>
        <NavBar onModalChange={this.props.onModalChange} />
        <Route exact path="/" render={routeProps => this.Home(routeProps)} />
        <Route path="/cbt" render={routeProps => this.CBT(routeProps)} />
        <Route
          path="/coping"
          render={routeProps => this.CopingSkills(routeProps)}
        />
        <Route
          path="/dm"
          render={routeProps => this.DailyMaintenance(routeProps)}
        />
        <Route path="/hist" render={routeProps => this.History(routeProps)} />
        <Route path="/phq9" render={routeProps => this.PHQ9(routeProps)} />
      </Router>
    );
  }
}

export default AppRouter;
