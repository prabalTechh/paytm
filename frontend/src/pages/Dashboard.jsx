import Balance from "../components/Balance";
import Navbar from "../components/Navbar";
import Users from "../components/User";

const Dashboard = () => {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <Navbar Username={"user"} icon={"A"} />
      <div className=" p-12">
        <Balance balance={"5000"} />
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
