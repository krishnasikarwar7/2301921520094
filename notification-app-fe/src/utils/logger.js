import axios from 'axios';

export async function Log(level, packageName, message) {
  const payload = {
    stack: "frontend", 
    level: level.toLowerCase(),
    package: packageName.toLowerCase(),
    message: message
  };

  try {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjc2FpMjMwODVAZ2xiaXRtLmFjLmluIiwiZXhwIjoxNzgyNDU0NzkzLCJpYXQiOjE3ODI0NTM4OTMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4Njc5NDliNC1hYzBjLTRkNjQtYTk2Yy0yOGFkOTNlNDBmMzYiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJrcmlzaG5hIHNpbmdoIHNpa2Fyd2FyIiwic3ViIjoiZTczOWIwZWUtYjY4OC00MDhhLWEwNTItNDM1ZGY2NzQ4ZTc2In0sImVtYWlsIjoiY3NhaTIzMDg1QGdsYml0bS5hYy5pbiIsIm5hbWUiOiJrcmlzaG5hIHNpbmdoIHNpa2Fyd2FyIiwicm9sbE5vIjoiMjMwMTkyMTUyMDA5NCIsImFjY2Vzc0NvZGUiOiJ4eGtKbmsiLCJjbGllbnRJRCI6ImU3MzliMGVlLWI2ODgtNDA4YS1hMDUyLTQzNWRmNjc0OGU3NiIsImNsaWVudFNlY3JldCI6ImR5WVFyeWJiRGJWRFVCQ1oifQ.shiUHz2VFfmi5ArjOXU6pH52aPayVpoGRZUm4wl2138"; 

    const response = await axios.post('http://4.224.186.213/evaluation-service/logs', payload, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`[Remote Log Success] LogID: ${response.data.logID}`);
  } catch (error) {
    console.error("Logging middleware failed to transmit:", error.response?.data || error.message);
  }
}