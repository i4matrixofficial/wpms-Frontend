const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "2,500+", label: "Verified Workers" },
  { value: "15,000+", label: "Completed Jobs" },
  { value: "4.9", label: "Avg Rating" },
];

export default function Stats() {
  return (
    <section className="stats">
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="stat-num tone">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}