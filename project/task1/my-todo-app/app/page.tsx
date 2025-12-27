export default function TodoPage() {
  return (
    <main style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
        
        {/* Header Section */}
        <header style={{ borderBottom: '2px solid #eee', marginBottom: '20px', paddingBottom: '10px' }}>
          <h1 style={{ color: '#1a73e8', margin: 0, fontSize: '24px' }}>✅ Task Manager Pro</h1>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Version 2.0 - Kubernetes Managed</p>
        </header>

        {/* Input Feature */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            placeholder="What needs to be done?" 
            style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #ddd', fontSize: '16px' }}
          />
          <button style={{ backgroundColor: '#1a73e8', color: 'white', border: 'none', padding: '0 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
            Add
          </button>
        </div>

        {/* Task List (Mockup) */}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '12px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" checked readOnly />
            <span style={{ color: '#333' }}>Complete DevOps Project Submission</span>
          </li>
          <li style={{ padding: '12px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" />
            <span style={{ color: '#333' }}>Review Prometheus Metrics</span>
          </li>
        </ul>
      </div>
    </main>
  );
}