import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState(''); 

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjc2FpMjMwODVAZ2xiaXRtLmFjLmluIiwiZXhwIjoxNzgyNDU0NzkzLCJpYXQiOjE3ODI0NTM4OTMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4Njc5NDliNC1hYzBjLTRkNjQtYTk2Yy0yOGFkOTNlNDBmMzYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrcmlzaG5hIHNpbmdoIHNpa2Fyd2FyIiwic3ViIjoiZTczOWIwZWUtYjY4OC00MDhhLWEwNTItNDM1ZGY2NzQ4ZTc2In0sImVtYWlsIjoiY3NhaTIzMDg1QGdsYml0bS5hYy5pbiIsIm5hbWUiOiJrcmlzaG5hIHNpbmdoIHNpa2Fyd2FyIiwicm9sbE5vIjoiMjMwMTkyMTUyMDA5NCIsImFjY2Vzc0NvZGUiOiJ4eGtKbmsiLCJjbGllbnRJRCI6ImU3MzliMGVlLWI2ODgtNDA4YS1hMDUyLTQzNWRmNjc0OGU3NiIsImNsaWVudFNlY3JldCI6ImR5WVFyeWJiRGJWRFVCQ1oifQ.shiUHz2VFfmi5ArjOXU6pH52aPayVpoGRZUm4wl2138"; 
        
        let queryParams = `?limit=${limit}&page=${page}`;
        if (typeFilter) {
          queryParams += `&notification_type=${typeFilter}`;
        }

        const response = await axios.get(`http://4.224.186.213/evaluation-service/notifications${queryParams}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Failed fetching paginated data streams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [limit, page, typeFilter]); 

  return (
    <div style={{ padding: '24px', fontFamily: 'sans-serif', maxWidth: '700px', margin: '0 auto', backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <h1 style={{ color: '#1c7ed6', marginBottom: '20px' }}>Campus Priority Inbox — Dashboard</h1>
      
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap', backgroundColor: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <div>
          <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Items per Page:</label>
          <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} style={{ padding: '6px', borderRadius: '4px' }}>
            <option value={10}>10 Items</option>
            <option value={15}>15 Items</option>
            <option value={20}>20 Items</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Filter Classification:</label>
          <select value={typeFilter} onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }} style={{ padding: '6px', borderRadius: '4px' }}>
            <option value="">All Notifications</option>
            <option value="Placement">Placements Only</option>
            <option value="Result">Results Only</option>
            <option value="Event">Events Only</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '18px' }}>Updating inbox list...</div>
      ) : (
        <div>
          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#868e96' }}>No notifications found matching these criteria.</div>
          ) : (
            notifications.map((item) => (
              <div key={item.ID} style={{
                borderLeft: `5px solid ${item.Type === 'Placement' ? '#f59f00' : item.Type === 'Result' ? '#228be6' : '#868e96'}`,
                backgroundColor: '#fff',
                borderRadius: '6px',
                padding: '16px',
                marginBottom: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  marginBottom: '6px',
                  backgroundColor: item.Type === 'Placement' ? '#fff9db' : item.Type === 'Result' ? '#e7f5ff' : '#f1f3f5',
                  color: item.Type === 'Placement' ? '#f59f00' : item.Type === 'Result' ? '#228be6' : '#868e96'
                }}>
                  {item.Type}
                </span>
                <h4 style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#212529' }}>{item.Message}</h4>
                <small style={{ color: '#868e96' }}>{new Date(item.Timestamp).toLocaleString()}</small>
              </div>
            ))
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px', backgroundColor: '#fff', padding: '12px', borderRadius: '8px' }}>
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} style={{ padding: '8px 16px', borderRadius: '4px', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
              Previous Page
            </button>
            <span>Current Page: <strong>{page}</strong></span>
            <button disabled={notifications.length < limit} onClick={() => setPage(p => p + 1)} style={{ padding: '8px 16px', borderRadius: '4px', cursor: notifications.length < limit ? 'not-allowed' : 'pointer' }}>
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;