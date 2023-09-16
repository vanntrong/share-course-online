import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "../layouts/main";
import Home from "@/modules/home/features/home";
import CourseList from "@/modules/courses/features/courseList";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/courses/:courseSlug" element={<CourseList />} />
    </Route>
  )
);
