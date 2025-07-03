import React, { useState } from 'react';

interface Job {
  job_title: string;
  employer_name: string;
  job_city: string;
  job_country: string;
  job_description: string;
  job_google_link: string;
}

const JobListings: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const fetchJobs = async (keyword: string, location: string) => {
    setLoading(true);
    setError('');
    setJobs([]);

    try {
      const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
        keyword
      )}&location=${encodeURIComponent(location)}&page=1&num_pages=1`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        },
      });

      const data = await response.json();

      if (data && data.data) {
        setJobs(data.data);
      } else {
        setError('No jobs found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load jobs.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!keyword.trim()) {
      setError('Please enter a keyword.');
      return;
    }
    fetchJobs(keyword, location);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">🔎 Job Opportunities</h2>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Job title or keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSearch}>
          Search Jobs
        </button>
      </div>

      {loading && <p>Loading jobs...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row g-4">
        {jobs.map((job, index) => (
          <div key={index} className="col-md-4">
            <div className="card p-3 h-100 job-card">
              <h5 className="job-title">{job.job_title}</h5>
              <p className="job-company">
                {job.employer_name} - {job.job_city}, {job.job_country}
              </p>
              <p>{job.job_description.slice(0, 120)}...</p>
              <a
                href={job.job_google_link}
                className="btn btn-primary mt-auto w-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobListings;
