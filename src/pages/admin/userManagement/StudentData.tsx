import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types/global";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import { Link } from "react-router-dom";

type TTableData = {
  _id: string;
  key: string;
  fullName: string;
  id: string;
  email: string;
  contactNo: string;
};

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentsData, isFetching } = useGetAllStudentsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  const metaData = studentsData?.meta;
  const tableData: TTableData[] =
    studentsData?.data.map(
      ({ _id, fullName, id, email, contactNo }: TTableData, index: number) => ({
        key: _id || index.toString(),
        _id,
        fullName,
        id,
        email,
        contactNo,
      })
    ) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Roll No",
      dataIndex: "id",
    },
    {
      title: "Name",
      dataIndex: "fullName",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "Actions",
      dataIndex: "",
      align: "center",
      key: "x1",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) => {
        queryParams.push({ name: "name", value: item });
      });
      filters.year?.forEach((item) => {
        queryParams.push({ name: "year", value: item });
      });
      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
        pagination={false}
      />
      <Pagination
        onChange={(value) => setPage(value)}
        pageSize={metaData?.limit}
        total={metaData?.total}
        align="end"
        className="mt-4"
      />
    </>
  );
};

export default StudentData;
