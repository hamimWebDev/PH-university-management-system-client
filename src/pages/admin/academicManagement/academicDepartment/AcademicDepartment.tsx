import { Button, Table, TableColumnsType } from "antd";
import { useGetAllDepartmentQuery } from "../../../../redux/features/admin/academicManagementApi";

type TTableData = {
  _id: string;
  key: string;
  name: string;
  academicFaculty: { name: string };
};

const AcademicDepartment = () => {
  const { data: facultyData, isFetching } = useGetAllDepartmentQuery(undefined);

  const tableData: TTableData[] =
    facultyData?.data.map(
      ({ _id, name, academicFaculty }: TTableData, index: number) => ({
        key: _id || index.toString(),
        _id,
        name,
        academicFaculty,
      })
    ) || [];

  // Extract unique faculty names for filtering
  const facultyNames = [
    ...new Set(tableData.map((item) => item.academicFaculty.name)),
  ];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "40%",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Faculty",
      dataIndex: "academicFaculty",
      width: "40%",
      showSorterTooltip: { target: "full-header" },
      render: (academicFaculty: TTableData["academicFaculty"]) =>
        academicFaculty.name,
      filters: facultyNames.map((name) => ({
        text: name,
        value: name,
      })),
      onFilter: (value, record) => record.academicFaculty.name === value,
    },
    {
      title: "Update",
      dataIndex: "",
      width: "30%",
      align: "center",
      key: "x1",
      render: () => (
        <div>
          <Button>Update</Button>
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "",
      width: "30%",
      align: "center",
      key: "x2",
      render: () => (
        <div>
          <Button>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicDepartment;
