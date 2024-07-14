import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import FacultyOfferedCourse from "../pages/faculty/FacultyOfferedCourse";

const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Crouse",
    path: "offered-crouse",
    element: <FacultyOfferedCourse />,
  },
];

export default facultyPaths;
