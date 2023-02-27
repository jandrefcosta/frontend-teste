import React, { Suspense } from "react"
import {
    Route,
    Routes
} from "react-router-dom";

const HomePage = React.lazy(() => import("../pages/home"));

function AuthorizedRoutes() {
    return (
        <Suspense fallback={<div>carregando...</div>}>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Suspense>
    )
}


export default AuthorizedRoutes