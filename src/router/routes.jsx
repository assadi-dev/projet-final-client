import { createBrowserRouter } from "react-router-dom";
import HomeView from "../view/HomeView/HomeView";
import SurveyView from "../view/SurveyView/SurveyView";
import AdminLayout from "../view/layout/AdminLayout/AdminLayout";
import AdminHome from "../view/Admin/AdminHome/AdminHome";
import AdminLogin from "../view/Admin/AdminLogin/AdminLogin";
import AdminQuestions from "../view/Admin/AdminQuestions/AdminQuestions";
import { AdminAnswers } from "../view/Admin/AdminAnswers/AdminAnswers";

export default createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "/survey/:idSurvey",
    element: <SurveyView />,
  },
  {
    path: "login",
    element: <AdminLogin />,
  },
  {
    path: "administration",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminHome />,
      },
      {
        path: "questions",
        element: <AdminQuestions />,
      },
      {
        path: "answers",
        element: <AdminAnswers />,
      },
    ],
  },
]);
