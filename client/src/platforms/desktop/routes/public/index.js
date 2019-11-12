// Library Imports
import React, { Component, lazy, Suspense } from "react";
import { Route } from "react-router-dom";

// Relative Imports

import Welcome from "../../pages/_public/welcome";
import Create from "../../pages/_auth/create";
import Login from "../../pages/_auth/login";
import Loader from "../../components/loader";

const Faq = lazy(() => import("../../../../universal/pages/_public/faq"));
// const Create = lazy(() =>  import("../../pages/_auth/create"));
// const Login = lazy(() => import("../../pages/_auth/login"));
const Blog = lazy (() => import("../../../../universal/pages/_public/blog"));
const Team = lazy(() =>  import("../../../../universal/pages/_public/team"));
const Timeline = lazy(() => import("../../../../universal/pages/_public/timeline"));
const Whitepaper = lazy(() => import("../../../../universal/pages/_public/whitepaper"));

class PublicRoutesDesktop extends Component {
  render() {
    return (
      <div>
          <Suspense fallback={<Loader/>}>
        <Route path="/" exact component={Welcome} />
        <Route path="/faq" exact component={Faq} />
        <Route path="/blog" exact component={Blog} />
        <Route path="/timeline" exact component={Timeline} />
        <Route path="/team" exact component={Team} />
        <Route path="/create" exact component={Create} />
        <Route path="/login" exact component={Login} />
        <Route path="/whitepaper" exact component={Whitepaper} />
          </Suspense>
      </div>
    );
  }
}
