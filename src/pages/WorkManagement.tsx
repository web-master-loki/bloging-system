
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import WorkManagement from "@/components/WorkManagement";

const WorkManagementPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <DashboardLayout>
      <WorkManagement />
    </DashboardLayout>
  );
};

export default WorkManagementPage;
