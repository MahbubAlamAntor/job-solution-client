import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Login from "../Authentication/Login";
import Registration from "../Authentication/Register";
import ErrorPage from "../ErrorPage/ErrorPage";
import AllJobs from "../Pages/AllJobs";
import AddJob from "../Pages/AddJob";
import BidRequest from "../Pages/BidRequest";
import Mybids from "./Mybids";
import MyPostedJobs from "./MyPostedJobs";
import JobDetails from "./JobDetails";
import UpdateJob from "./UpdateJob";

const route = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/login',
                element: <Login></Login>
            },
            {
                path: '/registration',
                element: <Registration></Registration>
            },
            {
                path:'/jobs',
                element: <AllJobs></AllJobs>
            },
            {
                path:'/add-job',
                element: <AddJob></AddJob>
            },
            {
                path: '/bid-requests',
                element: <BidRequest></BidRequest>
            },
            {
                path: '/my-bids',
                element: <Mybids></Mybids>
            },
            {
                path: '/my-posted-jobs',
                element: <MyPostedJobs></MyPostedJobs>
            },
            {
                path: '/job/:id',
                element: <JobDetails></JobDetails>
            },
            {
                path: '/update/:id',
                element: <UpdateJob></UpdateJob>
            }
        ]
    }
])

export default route