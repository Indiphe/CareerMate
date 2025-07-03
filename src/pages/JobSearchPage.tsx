import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  Bookmark,
  ExternalLink,
} from 'lucide-react';

interface Job {
  job_title: string;
  employer_name: string;
  job_city: string;
  job_country: string;
  job_description: string;
  job_google_link: string;
  job_employment_type: string;
  job_min_salary?: number;
  job_max_salary?: number;
  job_posted_at_datetime_utc?: string;
}

const JobSearchPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);

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
          'x-rapidapi-key': '9ace7dcbdfmshf75a75a5fd326f0p187b95jsn33f3cc7b1216',
          'x-rapidapi-host': 'jsearch.p.rapidapi.com',
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
    if (!searchTerm.trim()) {
      setError('Please enter a job keyword.');
      return;
    }
    fetchJobs(searchTerm, location);
  };

  const filteredJobs = remoteOnly
    ? jobs.filter((job) =>
        job.job_description.toLowerCase().includes('remote') ||
        job.job_title.toLowerCase().includes('remote')
      )
    : jobs;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Search</h1>
          <p className="text-gray-600">
            Find your next opportunity with AI-powered job matching across South Africa
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center">
            <Filter className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">Search Filters</h2>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Job title or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location (city or province)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              onClick={handleSearch}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Search Jobs
            </button>
          </div>

          <div className="px-6 pb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Remote work only</span>
            </label>
          </div>
        </div>

        {loading && <p className="text-center">Loading jobs...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {filteredJobs.length} Jobs Found
              </h2>
            </div>

            <div className="divide-y divide-gray-200">
              {filteredJobs.map((job, index) => (
                <div
                  key={index}
                  className="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {job.job_title}
                      </h3>
                      <p className="text-blue-600 font-medium">
                        {job.employer_name}
                      </p>
                      <p className="text-gray-600 mb-2">
                        {job.job_description.slice(0, 150)}...
                      </p>
                    </div>
                    <a
                      href={job.job_google_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-blue-600"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {job.job_city}, {job.job_country}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {job.job_employment_type}
                    </div>
                    {job.job_min_salary && (
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2" />
                        R{job.job_min_salary} - R{job.job_max_salary}
                      </div>
                    )}
                    <div className="text-gray-500">
                      Posted: {new Date(job.job_posted_at_datetime_utc || '').toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;
