import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemesterQuery } from "../../../../redux/features/admin/academicManagementApi";
import { useState } from "react";
import { TQueryParam } from "../../../../types/global";

type TTableData = {
  _id: string;
  key: string;
  name: string;
  startMonth: string;
  endMonth: string;
  year: string;
};

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: semesterData, isFetching } = useGetAllSemesterQuery(params);

  const tableData: TTableData[] =
    semesterData?.data.map(
      (
        { _id, name, startMonth, endMonth, year }: TTableData,
        index: number
      ) => ({
        key: _id || index.toString(),
        _id,
        name,
        startMonth,
        endMonth,
        year,
      })
    ) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2024",
          value: "2024",
        },
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Update",
      dataIndex: "",
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
      align: "center",
      key: "x2",
      render: () => (
        <div>
          <Button>Delete</Button>
        </div>
      ),
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
