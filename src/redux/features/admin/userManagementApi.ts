import { TQueryParam } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addStudent: builder.mutation({
      query: (data) => ({
        url: "users/create-student",
        method: "POST",
        body: data,
      }),
    }),
    getAllStudents: builder.query({
      query: (argh) => {
        const params = new URLSearchParams();
        if (argh) {
          argh.forEach((item: TQueryParam) =>
            params.append(item.name, item.value as string)
          );
        }
        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: any) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const { useAddStudentMutation, useGetAllStudentsQuery } =
  userManagementApi;
