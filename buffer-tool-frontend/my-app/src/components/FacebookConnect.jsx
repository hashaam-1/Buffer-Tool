const FacebookConnect = () => {
  const handleConnect = () => {
    const token = localStorage.getItem("token"); // ✅ Your stored JWT token
    window.location.href = `http://localhost:5000/api/social/connect/facebook?token=${token}`;
  };

  return <button onClick={handleConnect} className="btn">Connect Facebook</button>;
};

export default FacebookConnect;
