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
    // getAllSemester: builder.query({
    //   query: (argh) => {
    //     const params = new URLSearchParams();
    //     if (argh) {
    //       argh.forEach((item: TQueryParam) =>
    //         params.append(item.name, item.value as string)
    //       );
    //     }
    //     return {
    //       url: "/academic-semesters",
    //       method: "GET",
    //       params: params,
    //     };
    //   },
    //   transformResponse: (response: any) => {
    //     return {
    //       data: response.data,
    //       meta: response.meta,
    //     };
    //   },
    // }),
  }),
});

export const { useAddStudentMutation } = userManagementApi;
