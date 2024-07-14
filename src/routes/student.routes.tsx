import StudentDashboard from "../pages/student/StudentDashboard";
import StudentOfferedCourse from "../pages/student/StudentOfferedCourse";

const studentPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <StudentDashboard />,
  },
  {
    name: "Offered Crouse",
    path: "offered-crouse",
    element: <StudentOfferedCourse />,
  },
];

export default studentPaths;
