const form= {
    width: '40%',backgroundcolor: 'red'
}

function Login() {
  return (
    <form action="" style={form}>
      <label>
        <p>Username</p>
        <input type="text"/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
export default Login;
