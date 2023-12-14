/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import HomeView from "../view/client/HomeView/HomeView";
import SurveyView from "../view/client/SurveyView/SurveyView";
import CompletedView from "../view/client/SurveyView/CompletedView";
import AdminLayout from "../view/layout/AdminLayout/AdminLayout";
import AdminHome from "../view/admin/AdminHome/AdminHome";
import AdminLogin from "../view/admin/AdminLogin/AdminLogin";
import AdminQuestions from "../view/admin/AdminQuestions/AdminQuestions";
import { AdminAnswers } from "../view/admin/AdminAnswers/AdminAnswers";
import { useRedirect } from "./AuthRedirect";
import AnswerView from "../view/client/AnswerView/AnswerView";

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
    path: "/completed/:token",
    element: <CompletedView />
  },
  {
    path: "/answers/:token",
    element: <AnswerView />
  },
  {
    path: "login",
    element: <AdminLogin />,
  },
  {
    loader: useRedirect,
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
