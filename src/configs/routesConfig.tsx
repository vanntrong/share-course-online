import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import MainLayout from "../layouts/main";
import Home from "@/modules/home/features/home";
import CourseList from "@/modules/courses/features/courseList";
import Admin from "@/modules/admin/features/admin";
import ProtectedRoutes from "@/routes/protectedRoutes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/categories/:id" element={<CourseList />} />
      <Route path="/admin" element={<ProtectedRoutes />}>
        <Route element={<Admin />} index />
      </Route>
    </Route>
  )
);
