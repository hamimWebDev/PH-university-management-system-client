import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select this Name" }),
  year: z.string({ required_error: "Please select this Year" }),
  startMonth: z.string({ required_error: "Please select this Month" }),
  endMonth: z.string({ required_error: "Please select this Month" }),
});

export const academicFacultySchema = z.object({
  name: z.string({ required_error: "Please select this Name" }),
});

export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please select this Name" }),
  academicFaculty: z.string({ required_error: "Please select this Name" }),
});
