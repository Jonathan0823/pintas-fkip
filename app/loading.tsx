const Loading = () => {
    return (
      <div className="fixed inset-0 w-screen min-h-screen flex flex-col gap-4 justify-center items-center">
        <div className="loader"></div>
        <h2>Loading...</h2>
      </div>
    );
  };
  
  export default Loading