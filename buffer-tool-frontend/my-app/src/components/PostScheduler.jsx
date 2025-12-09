import { useState } from "react";
import { useSchedulePostMutation } from "../features/posts/postApi";

const PostScheduler = () => {
  const [schedulePost] = useSchedulePostMutation();
  const [form, setForm] = useState({ content: "", scheduledTime: "", platforms: ["facebook"] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await schedulePost(form);
    alert("Scheduled!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Post content" className="textarea" />
      <input type="datetime-local" onChange={(e) => setForm({ ...form, scheduledTime: e.target.value })} className="input" />
      <button className="btn">Schedule Post</button>
    </form>
  );
};

export default PostScheduler;