import { useState, useEffect } from 'react';
import ReportItem from './ReportItem';
import reportApi from '../api/report';
import {useAuth} from '../contexts/AuthContext'
import adminApi from '../api/admin'

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        if (user.role === "ADMIN") {
          const data = await adminApi.getReports();
          setReports(data.reports);
        }
        else {
          const data = await reportApi.getReports();
          setReports(data.reports);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const totalReports = reports.length;

  return (
    <section id='report-list' className='section-container'>
      <h1 className='text-3xl font-semibold mt-5 mb-10'>{user.role === "ADMIN" ? `Report Received List (total: ${totalReports})` : "Report List"}</h1>
      <div className='grid grid-cols-4 gap-x-8 gap-y-12'>
        {reports.map((report) => (
          <ReportItem key={report.id} report={report} user={user} />
        ))}
      </div>
    </section>
  );
};

export default ReportList;