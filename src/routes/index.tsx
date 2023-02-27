import React, { Suspense, useContext, useEffect } from "react"

import UnauthorizedRoutes from './UnauthorizedRoutes';
import AuthorizedRoutes from './AuthorizedRoutes';
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../contexts/auth";

function RouterControl() {
    const { signed } = useAuth();
    return (
        <BrowserRouter>
            {signed ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
        </BrowserRouter>
    )
}

export default RouterControl;
