const users = [
  { id: 1, name: "Asha", role: "Admin" },
  { id: 2, name: "Ravi", role: "Editor" },
  { id: 3, name: "Meena", role: "Viewer" },
];

export default function Admin() {
  return (
    <>
      <h1>Admin</h1>
      <table>
        <thead><tr><th>ID</th><th>Name</th><th>Role</th></tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.role}</td></tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
