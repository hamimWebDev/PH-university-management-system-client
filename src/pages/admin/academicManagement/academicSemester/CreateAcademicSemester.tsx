import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../../components/form/PHSelect";
import { semesterOption } from "../../../../constants/semester";
import { monthOption, yearOption } from "../../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../../Schemas/acadimicManagement";
import { useAddAcademicSemesterMutation } from "../../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../../types/global";

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const tostId = toast.loading("Creating...");
    const name = semesterOption[Number(data.name) - 1].label;
    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;
      if (res.error) {
        toast.error(res.error.data.message, { id: tostId });
      } else {
        toast.success("semester Created", { id: tostId });
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
            resolver={zodResolver(academicSemesterSchema)}
          >
            <PHSelect label="Name" name="name" options={semesterOption} />
            <PHSelect label="Year" name="year" options={yearOption} />
            <PHSelect
              label="Start Month"
              name="startMonth"
              options={monthOption}
            />
            <PHSelect label="End Month" name="endMonth" options={monthOption} />
            <Button htmlType="submit">Submit</Button>
          </PHFrom>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicSemester;
