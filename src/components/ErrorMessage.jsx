function ErrorMessage({ message }) {
  return (
    <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
      <h3>Error: {message}</h3>
    </div>
  );
}

export default ErrorMessage;