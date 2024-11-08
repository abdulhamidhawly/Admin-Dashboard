import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; 
import axiosInstance from '../../server/axios.instance'

const RunsheetPage = ({ updateRunsheetCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [runsheetsData, setRunsheetsData] = useState([
   
  ]);

  // const activeCount = runsheetsData.filter(item => item.status === "Open").length;
  // const inactiveCount = runsheetsData.filter(item => item.status === "Closed").length;

  useEffect(() => {
    if (typeof updateRunsheetCount === "function") {
      updateRunsheetCount({ active: runsheetsData.length, inactive: runsheetsData.length });
    }
  }, [updateRunsheetCount,runsheetsData]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/runsheets")
      setRunsheetsData(response.data)
    }
   
    fetchData()
  },[])

  if (showRecords) return null;

  // Handle row click to navigate to the detail page
  const handleRowClick = (id) => {
    navigate(`/runsheetDetailPage/${id}`);
  };

  return (
    <PageWrapper
      title="Runsheets"
      filters={["search", "branch", "status"]}
      placeholders={{
        search: "Search by Runsheet #",
        branch: "Branch",
        status: "Status",
      }}
      addButtonLabel="Add Runsheet"
      onAddClick={() => navigate("/add-runsheet")}
      showAddButton={true}
      onSearch={(value) => setSearchTerm(value)}
      onBranchChange={(value) => setBranch(value)}
      onStatusChange={(value) => setStatus(value)}
      statusOptions={["Open", "Closed"]}
      isRunsheetPage={true}
    >
      <TableComponent
        columns={[
          "RunsheetID",
          "DriverID",
          "VehicleID",
          "VehicleSafety",
          "DriverSafety",
          "StartTime",
          "FinishTime",
          "RestTime",
          "FuelAdded",
        ]}
        data={runsheetsData}
        editPageUrl="/edit-runsheet"
        pageSpecificIcons={faFileExcel}
        isRunsheetPage={true} 
        onRowClick={handleRowClick}
      />
    </PageWrapper>
  );
};

export default RunsheetPage;
