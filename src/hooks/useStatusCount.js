import { useMemo } from "react";

const useStatusCount = (driversData) => {
  const statusCount = useMemo(() => {
    const activeCount = driversData.filter((driver) => driver.status === "Active").length;
    const inactiveCount = driversData.filter((driver) => driver.status === "Not Active").length;
    return { activeCount, inactiveCount };
  }, [driversData]);

  return statusCount;
};

export default useStatusCount;