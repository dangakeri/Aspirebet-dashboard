// import React from "react";
// import { Table, Tag, Button } from "antd";
// import { DownloadOutlined } from "@ant-design/icons";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";

// // Dummy data
// const invoices = [
//   {
//     key: "1",
//     id: "INV001",
//     amount: "Ksh 1,200.00",
//     company: "Telora Technologies",
//     date: "2025-05-20",
//     status: "Pending",
//   },
// ];

// const InvoiceTable = () => {
//   const columns = [
//     {
//       title: "Invoice ID",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "Amount",
//       dataIndex: "amount",
//       key: "amount",
//     },
//     {
//       title: "Company Name",
//       dataIndex: "company",
//       key: "company",
//     },
//     {
//       title: "Date",
//       dataIndex: "date",
//       key: "date",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (status) => {
//         let color = "green";
//         if (status === "Unpaid") color = "volcano";
//         else if (status === "Pending") color = "gold";
//         return <Tag color={color}>{status}</Tag>;
//       },
//     },
//     {
//       title: "Download",
//       key: "download",
//       render: (_, record) => (
//         <Button
//           type="primary"
//           icon={<DownloadOutlined />}
//           onClick={() => handlePDFDownload(record)}
//         >
//           PDF
//         </Button>
//       ),
//     },
//   ];

//   const handlePDFDownload = (record) => {
//     const doc = new jsPDF();

//     doc.setFontSize(18);
//     doc.text("Invoice", 14, 22);

//     autoTable(doc, {
//       startY: 30,
//       head: [["Field", "Value"]],
//       body: [
//         ["Invoice ID", record.id],
//         ["Amount", record.amount],
//         ["Company Name", record.company],
//         ["Date", record.date],
//         ["Status", record.status],
//       ],
//     });

//     doc.save(`${record.id}.pdf`);
//   };

//   return (
//     <div className="p-4">
//       <h2 style={{ marginBottom: 16 }}>Invoice List</h2>
//       <Table columns={columns} dataSource={invoices} />
//     </div>
//   );
// };

// export default InvoiceTable;
import React from "react";
import { Table, Tag, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Dummy data
const invoices = [
  {
    key: "1",
    id: "INV001",
    amount: "Ksh 1,200.00",
    company: "Telora Technologies",
    date: "2025-05-20",
    status: "Pending",
  },
];

const InvoiceTable = () => {
  const handlePDFDownload = (record) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 22);

    autoTable(doc, {
      startY: 30,
      head: [["Field", "Value"]],
      body: [
        ["Invoice ID", record.id],
        ["Amount", record.amount],
        ["Company Name", record.company],
        ["Date", record.date],
        ["Status", record.status],
      ],
    });

    doc.save(`${record.id}.pdf`);
  };

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "id",
      key: "id",
      responsive: ["xs", "sm", "md", "lg"], // show on all sizes
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Company Name",
      dataIndex: "company",
      key: "company",
      ellipsis: true, // Truncate long company names
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "green";
        if (status === "Unpaid") color = "volcano";
        else if (status === "Pending") color = "gold";
        return (
          <Tag
            color={color}
            className="text-xs sm:text-sm px-2 py-0.5 rounded-full"
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Download",
      key: "download",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<DownloadOutlined />}
          size="small" // smaller for mobile
          onClick={() => handlePDFDownload(record)}
        >
          PDF
        </Button>
      ),
    },
  ];

  return (
    <div className="p-3 sm:p-4 bg-white rounded-md shadow">
      <h2 className="mb-4 text-base sm:text-lg font-semibold text-gray-800">
        Invoice List
      </h2>
      <Table
        columns={columns}
        dataSource={invoices}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }} 
      />
    </div>
  );
};

export default InvoiceTable;
