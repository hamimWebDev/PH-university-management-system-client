import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAcademicFacultyMutation } from "../../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../../types/global";
import PHInput from "../../../../components/form/PHInput";
import { academicFacultySchema } from "../../../../Schemas/acadimicManagement";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const tostId = toast.loading("Creating...");

    const facultyData = {
      name: data.name,
    };
    try {
      const res = (await addAcademicFaculty(facultyData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: tostId });
      } else {
        toast.success("Faculty Created", { id: tostId });
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
            resolver={zodResolver(academicFacultySchema)}
          >
            <PHInput type="text" name="name" label="Name" />
            <Button htmlType="submit">Submit</Button>
          </PHFrom>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicFaculty;
