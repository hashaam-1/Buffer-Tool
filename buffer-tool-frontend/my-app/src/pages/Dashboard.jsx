import PostScheduler from "../components/PostScheduler";
import FacebookConnect from "../components/FacebookConnect";
import PostList from "../components/PostList";

const Dashboard = () => {
  return (
    <div className="p-4 space-y-4">
      <FacebookConnect />
      <PostScheduler />
      <PostList />
    </div>
  );
};

export default Dashboard;