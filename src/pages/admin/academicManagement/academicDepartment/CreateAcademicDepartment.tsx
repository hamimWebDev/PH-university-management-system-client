import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../../Schemas/acadimicManagement";
import {
  useAddAcademicDepartmentMutation,
  useGetAllFacultyQuery,
} from "../../../../redux/features/admin/academicManagementApi";
import PHInput from "../../../../components/form/PHInput";
import { toast } from "sonner";
import { TResponse } from "../../../../types/global";

const CreateAcademicDepartment = () => {
  const [addDepartment] = useAddAcademicDepartmentMutation();
  const { data } = useGetAllFacultyQuery(undefined);
  const facultyList = data?.data
    ? data.data.map(({ name, _id }: any) => ({ name, _id }))
    : [];

  const facultyOptions = facultyList.map((item: any) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const tostId = toast.loading("Creating...");
    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };
    try {
      const res = (await addDepartment(departmentData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: tostId });
      } else {
        toast.success("department Created", { id: tostId });
      }
      console.log(res);
    } catch (err) {
      toast.error("Something went wrong", { id: tostId });
    }
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <PHFrom
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <PHInput type="text" label="Name" name="name" />
            <PHSelect
              label="Select Faculty"
              name="academicFaculty"
              options={facultyOptions}
            />
            <Button htmlType="submit">Submit</Button>
          </PHFrom>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicDepartment;
