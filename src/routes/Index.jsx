import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { PrivateRoute } from "./privateRoute";
import { Register } from "../pages/Register";
import { Homepage } from "../pages/Homepage";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Discover } from "../pages/Discover";
import { Trail } from "../pages/Trail";
import { Lesson } from "../pages/Lesson";
import { Profile } from "../pages/Profile";
import { Onboarding } from "../pages/Onboarding";
import { Quizpage } from "../pages/Quiz";
import { Redirect } from "./Redirect";

export function Router() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Redirect>
                                <Homepage />
                            </Redirect>
                        }
                    />
                    <Route path="/signup" element={<Register />} />
                    <Route path="/signin" element={<Login />} />

                    <Route
                        path="/quiz"
                        element={
                            <PrivateRoute>
                                <Quizpage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/discover"
                        element={
                            <PrivateRoute>
                                <Discover />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/discover/trails/:trail"
                        element={
                            <PrivateRoute>
                                <Trail />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/discover/lesson/:id"
                        element={
                            <PrivateRoute>
                                <Lesson />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/onboarding/:id"
                        element={
                            <PrivateRoute>
                                <Onboarding />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
