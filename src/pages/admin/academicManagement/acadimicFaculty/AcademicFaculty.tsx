import { Button, Table, TableColumnsType } from "antd";
import { useGetAllFacultyQuery } from "../../../../redux/features/admin/academicManagementApi";

type TTableData = {
  _id: string;
  key: string;
  name: string;
};

const AcademicFaculty = () => {
  const { data: facultyData, isFetching } = useGetAllFacultyQuery(undefined);

  const tableData: TTableData[] =
    facultyData?.data.map(({ _id, name }: TTableData, index: number) => ({
      key: _id || index.toString(),
      _id,
      name,
    })) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      width: "40%",

      showSorterTooltip: { target: "full-header" },
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

export default AcademicFaculty;
