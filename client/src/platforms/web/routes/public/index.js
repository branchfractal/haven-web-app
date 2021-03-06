// Library Imports
import React, { Component, Suspense } from "react";
//@ts-ignore
import { Route } from "react-router-dom";

import Loader from "../../../../shared/components/loader";
import { CreateWeb } from "../../pages/_auth/create";
import { LoginWeb } from "../../pages/_auth/login";

class PublicRoutesWeb extends Component {
  render() {
    return (
      <div>
        <Suspense fallback={<Loader />}>
          <Route path="/" exact component={LoginWeb} />
          <Route path="/create" exact component={CreateWeb} />
        </Suspense>
      </div>
    );
  }
}

export default PublicRoutesWeb;
