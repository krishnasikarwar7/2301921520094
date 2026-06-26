import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { processPriorityInbox } from './utils/priorityInbox';

function App() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjc2FpMjMwODVAZ2xiaXRtLmFjLmluIiwiZXhwIjoxNzgyNDU0NzkzLCJpYXQiOjE3ODI0NTM4OTMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4Njc5NDliNC1hYzBjLTRkNjQtYTk2Yy0yOGFkOTNlNDBmMzYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrcmlzaG5hIHNpbmdoIHNpa2Fyd2FyIiwic3ViIjoiZTczOWIwZWUtYjY4OC00MDhhLWEwNTItNDM1ZGY2NzQ4ZTc2In0sImVtYWlsIjoiY3NhaTIzMDg1QGdsYml0bS5hYy5pbiIsIm5hbWUiOiJrcmlzaG5hIHNpbmdoIHNpa2Fyd2FyIiwicm9sbE5vIjoiMjMwMTkyMTUyMDA5NCIsImFjY2Vzc0NvZGUiOiJ4eGtKbmsiLCJjbGllbnRJRCI6ImU3MzliMGVlLWI2ODgtNDA4YS1hMDUyLTQzNWRmNjc0OGU3NiIsImNsaWVudFNlY3JldCI6ImR5WVFyeWJiRGJWRFVCQ1oifQ.shiUHz2VFfmi5ArjOXU6pH52aPayVpoGRZUm4wl2138";
        
        const response = await axios.get('http://4.224.186.213/evaluation-service/notifications', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const topPriorityData = processPriorityInbox(response.data.notifications, 10);
        setNotifications(topPriorityData);
      } catch (error) {
        console.error("Failed fetching priority notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading priority items...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Priority Inbox</h1>
      <div style={{ listStyleType: 'none', padding: 0 }}>
        {notifications.map((item) => (
          <div key={item.ID} style={{
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '16px', 
            marginBottom: '12px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            backgroundColor: item.Type === 'Placement' ? '#fff9db' : item.Type === 'Result' ? '#e7f5ff' : '#f1f3f5'
          }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '8px',
              backgroundColor: item.Type === 'Placement' ? '#f59f00' : item.Type === 'Result' ? '#228be6' : '#868e96',
              color: '#fff'
            }}>
              {item.Type}
            </span>
            <p style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{item.Message}</p>
            <div style={{ fontSize: '12px', color: '#868e96' }}>{new Date(item.Timestamp).toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;