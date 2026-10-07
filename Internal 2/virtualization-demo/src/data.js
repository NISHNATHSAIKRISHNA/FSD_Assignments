// Deterministic fake data so every run / every mode renders identical rows.
const FIRST = ['Aarav', 'Diya', 'Rohan', 'Sneha', 'Vikram', 'Ananya', 'Karthik', 'Meera', 'Arjun', 'Priya'];
const LAST = ['Reddy', 'Sharma', 'Rao', 'Patel', 'Naidu', 'Iyer', 'Gupta', 'Kumar', 'Singh', 'Das'];
const DEPTS = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Support', 'Design', 'Legal'];
const STATUS = ['Active', 'On Leave', 'Remote'];

export function generateRows(count) {
  const rows = new Array(count);
  for (let i = 0; i < count; i++) {
    const first = FIRST[i % FIRST.length];
    const last = LAST[(i * 7) % LAST.length];
    rows[i] = {
      id: i + 1,
      name: `${first} ${last}`,
      email: `${first}.${last}${i + 1}@example.com`.toLowerCase(),
      department: DEPTS[i % DEPTS.length],
      salary: 30000 + ((i * 37) % 90000),
      status: STATUS[i % STATUS.length],
    };
  }
  return rows;
}
