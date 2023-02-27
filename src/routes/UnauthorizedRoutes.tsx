import React, { Suspense } from "react"
import {
    Route,
    Routes,
} from "react-router-dom";

const Login = React.lazy(() => import("../pages/login"));

function UnauthorizedRoutes() {
    return (
        <Suspense fallback={<div>carregando...</div>}>
            <Routes>
                <Route path="*" element={<Login />} />
            </Routes>
        </Suspense>
    )
}


export default UnauthorizedRoutes