import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Search, MapPin, Clock, DollarSign, Filter, Bookmark, ExternalLink } from 'lucide-react';

const JobSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [industry, setIndustry] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);

  const jobs = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      location: 'Cape Town, Western Cape',
      type: 'Full-time',
      salary: 'R650K - R850K',
      remote: true,
      industry: 'Technology',
      description: 'Join our team to build scalable web applications using React, Node.js, and cloud technologies.',
      requirements: ['5+ years experience', 'React/Node.js', 'AWS knowledge'],
      posted: '2 days ago',
      saved: false
    },
    {
      id: 2,
      title: 'Data Scientist',
      company: 'DataFlow Analytics',
      location: 'Johannesburg, Gauteng',
      type: 'Full-time',
      salary: 'R550K - R750K',
      remote: true,
      industry: 'Analytics',
      description: 'Analyze large datasets to drive business insights using Python, SQL, and machine learning.',
      requirements: ['Python/R proficiency', 'ML experience', 'Statistics background'],
      posted: '1 week ago',
      saved: true
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'InnovateLabs',
      location: 'Durban, KwaZulu-Natal',
      type: 'Full-time',
      salary: 'R700K - R950K',
      remote: false,
      industry: 'Technology',
      description: 'Lead product strategy and roadmap for our flagship SaaS platform.',
      requirements: ['3+ years PM experience', 'Agile methodology', 'Data-driven approach'],
      posted: '3 days ago',
      saved: false
    },
    {
      id: 4,
      title: 'UX Designer',
      company: 'DesignStudio Pro',
      location: 'Pretoria, Gauteng',
      type: 'Contract',
      salary: 'R450K - R600K',
      remote: true,
      industry: 'Design',
      description: 'Create intuitive user experiences for mobile and web applications.',
      requirements: ['Portfolio required', 'Figma expertise', 'User research skills'],
      posted: '5 days ago',
      saved: false
    },
    {
      id: 5,
      title: 'Marketing Specialist',
      company: 'GrowthHackers',
      location: 'Port Elizabeth, Eastern Cape',
      type: 'Part-time',
      salary: 'R280K - R380K',
      remote: true,
      industry: 'Marketing',
      description: 'Drive digital marketing campaigns and analyze performance metrics.',
      requirements: ['Digital marketing experience', 'Google Analytics', 'Content creation'],
      posted: '1 week ago',
      saved: true
    },
    {
      id: 6,
      title: 'Financial Analyst',
      company: 'Capital Insights',
      location: 'Bloemfontein, Free State',
      type: 'Full-time',
      salary: 'R420K - R580K',
      remote: false,
      industry: 'Finance',
      description: 'Analyze financial data and create reports for investment decisions.',
      requirements: ['CFA preferred', 'Excel proficiency', 'Financial modeling'],
      posted: '4 days ago',
      saved: false
    },
    {
      id: 7,
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      location: 'Polokwane, Limpopo',
      type: 'Full-time',
      salary: 'R580K - R780K',
      remote: true,
      industry: 'Technology',
      description: 'Manage cloud infrastructure and deployment pipelines.',
      requirements: ['Docker/Kubernetes', 'AWS/Azure', 'CI/CD experience'],
      posted: '6 days ago',
      saved: false
    },
    {
      id: 8,
      title: 'Nurse Practitioner',
      company: 'HealthCare Plus',
      location: 'Kimberley, Northern Cape',
      type: 'Full-time',
      salary: 'R380K - R520K',
      remote: false,
      industry: 'Healthcare',
      description: 'Provide primary healthcare services in a modern clinic setting.',
      requirements: ['Nursing degree', 'SANC registration', '2+ years experience'],
      posted: '2 days ago',
      saved: false
    },
    {
      id: 9,
      title: 'Sales Manager',
      company: 'RetailMax',
      location: 'Nelspruit, Mpumalanga',
      type: 'Full-time',
      salary: 'R480K - R650K',
      remote: false,
      industry: 'Retail',
      description: 'Lead sales team and develop strategies to increase revenue.',
      requirements: ['Sales leadership', 'CRM experience', 'Target achievement'],
      posted: '3 days ago',
      saved: false
    },
    {
      id: 10,
      title: 'Teacher - Mathematics',
      company: 'Excellence Academy',
      location: 'Rustenburg, North West',
      type: 'Full-time',
      salary: 'R320K - R420K',
      remote: false,
      industry: 'Education',
      description: 'Teach high school mathematics and prepare students for exams.',
      requirements: ['Teaching qualification', 'Mathematics degree', 'SACE registration'],
      posted: '1 week ago',
      saved: false
    },
    {
      id: 11,
      title: 'Mechanical Engineer',
      company: 'Industrial Solutions',
      location: 'Witbank, Mpumalanga',
      type: 'Full-time',
      salary: 'R520K - R720K',
      remote: false,
      industry: 'Engineering',
      description: 'Design and maintain mechanical systems for mining operations.',
      requirements: ['Mechanical Engineering degree', 'AutoCAD', 'Mining experience'],
      posted: '5 days ago',
      saved: false
    },
    {
      id: 12,
      title: 'Graphic Designer',
      company: 'Creative Agency',
      location: 'Stellenbosch, Western Cape',
      type: 'Contract',
      salary: 'R350K - R480K',
      remote: true,
      industry: 'Design',
      description: 'Create visual content for digital and print media.',
      requirements: ['Adobe Creative Suite', 'Portfolio required', 'Brand design'],
      posted: '4 days ago',
      saved: false
    },
    {
      id: 13,
      title: 'Project Manager',
      company: 'Construction Corp',
      location: 'George, Western Cape',
      type: 'Full-time',
      salary: 'R600K - R800K',
      remote: false,
      industry: 'Construction',
      description: 'Manage construction projects from planning to completion.',
      requirements: ['PMP certification', 'Construction experience', 'MS Project'],
      posted: '2 days ago',
      saved: false
    },
    {
      id: 14,
      title: 'Content Writer',
      company: 'Digital Media Hub',
      location: 'Pietermaritzburg, KwaZulu-Natal',
      type: 'Part-time',
      salary: 'R240K - R320K',
      remote: true,
      industry: 'Media',
      description: 'Create engaging content for websites and social media.',
      requirements: ['Excellent writing skills', 'SEO knowledge', 'Social media'],
      posted: '6 days ago',
      saved: false
    },
    {
      id: 15,
      title: 'Pharmacist',
      company: 'MediCare Pharmacy',
      location: 'East London, Eastern Cape',
      type: 'Full-time',
      salary: 'R450K - R620K',
      remote: false,
      industry: 'Healthcare',
      description: 'Dispense medications and provide pharmaceutical care.',
      requirements: ['Pharmacy degree', 'SAPC registration', 'Patient counseling'],
      posted: '3 days ago',
      saved: false
    },
    {
      id: 16,
      title: 'Business Analyst',
      company: 'Consulting Partners',
      location: 'Sandton, Gauteng',
      type: 'Full-time',
      salary: 'R520K - R700K',
      remote: true,
      industry: 'Consulting',
      description: 'Analyze business processes and recommend improvements.',
      requirements: ['Business analysis', 'Process mapping', 'Stakeholder management'],
      posted: '1 week ago',
      saved: false
    },
    {
      id: 17,
      title: 'Chef',
      company: 'Gourmet Restaurant',
      location: 'Hermanus, Western Cape',
      type: 'Full-time',
      salary: 'R280K - R380K',
      remote: false,
      industry: 'Hospitality',
      description: 'Prepare high-quality dishes in a fine dining establishment.',
      requirements: ['Culinary qualification', 'Fine dining experience', 'Menu planning'],
      posted: '4 days ago',
      saved: false
    },
    {
      id: 18,
      title: 'Accountant',
      company: 'Financial Services Ltd',
      location: 'Potchefstroom, North West',
      type: 'Full-time',
      salary: 'R380K - R520K',
      remote: false,
      industry: 'Finance',
      description: 'Manage financial records and prepare tax returns.',
      requirements: ['Accounting degree', 'SAICA articles', 'Tax knowledge'],
      posted: '5 days ago',
      saved: false
    },
    {
      id: 19,
      title: 'Social Worker',
      company: 'Community Care',
      location: 'Upington, Northern Cape',
      type: 'Full-time',
      salary: 'R280K - R380K',
      remote: false,
      industry: 'Social Services',
      description: 'Provide support services to vulnerable communities.',
      requirements: ['Social Work degree', 'SACSSP registration', 'Community work'],
      posted: '2 days ago',
      saved: false
    },
    {
      id: 20,
      title: 'Electrical Engineer',
      company: 'Power Systems',
      location: 'Richards Bay, KwaZulu-Natal',
      type: 'Full-time',
      salary: 'R580K - R780K',
      remote: false,
      industry: 'Engineering',
      description: 'Design electrical systems for industrial applications.',
      requirements: ['Electrical Engineering', 'Power systems', 'ECSA registration'],
      posted: '6 days ago',
      saved: false
    },
    {
      id: 21,
      title: 'HR Manager',
      company: 'People First',
      location: 'Centurion, Gauteng',
      type: 'Full-time',
      salary: 'R550K - R750K',
      remote: true,
      industry: 'Human Resources',
      description: 'Lead HR initiatives and manage employee relations.',
      requirements: ['HR qualification', 'Labour law knowledge', 'Leadership skills'],
      posted: '3 days ago',
      saved: false
    },
    {
      id: 22,
      title: 'Veterinarian',
      company: 'Animal Hospital',
      location: 'Oudtshoorn, Western Cape',
      type: 'Full-time',
      salary: 'R420K - R580K',
      remote: false,
      industry: 'Veterinary',
      description: 'Provide medical care for domestic and farm animals.',
      requirements: ['Veterinary degree', 'SAVC registration', 'Animal handling'],
      posted: '1 week ago',
      saved: false
    },
    {
      id: 23,
      title: 'Logistics Coordinator',
      company: 'Supply Chain Solutions',
      location: 'Vereeniging, Gauteng',
      type: 'Full-time',
      salary: 'R320K - R450K',
      remote: false,
      industry: 'Logistics',
      description: 'Coordinate transportation and warehouse operations.',
      requirements: ['Logistics experience', 'Supply chain knowledge', 'SAP skills'],
      posted: '4 days ago',
      saved: false
    },
    {
      id: 24,
      title: 'Physiotherapist',
      company: 'Rehab Center',
      location: 'Klerksdorp, North West',
      type: 'Full-time',
      salary: 'R380K - R520K',
      remote: false,
      industry: 'Healthcare',
      description: 'Provide rehabilitation services to patients.',
      requirements: ['Physiotherapy degree', 'HPCSA registration', 'Manual therapy'],
      posted: '5 days ago',
      saved: false
    },
    {
      id: 25,
      title: 'Civil Engineer',
      company: 'Infrastructure Builders',
      location: 'Mbombela, Mpumalanga',
      type: 'Full-time',
      salary: 'R520K - R720K',
      remote: false,
      industry: 'Engineering',
      description: 'Design and oversee construction of infrastructure projects.',
      requirements: ['Civil Engineering degree', 'Project management', 'AutoCAD'],
      posted: '2 days ago',
      saved: false
    },
    {
      id: 26,
      title: 'Psychologist',
      company: 'Mental Health Clinic',
      location: 'Mahikeng, North West',
      type: 'Part-time',
      salary: 'R350K - R480K',
      remote: false,
      industry: 'Healthcare',
      description: 'Provide psychological assessment and therapy services.',
      requirements: ['Psychology degree', 'HPCSA registration', 'Therapy experience'],
      posted: '6 days ago',
      saved: false
    },
    {
      id: 27,
      title: 'Quality Assurance Tester',
      company: 'Software Solutions',
      location: 'Midrand, Gauteng',
      type: 'Contract',
      salary: 'R380K - R520K',
      remote: true,
      industry: 'Technology',
      description: 'Test software applications and ensure quality standards.',
      requirements: ['QA experience', 'Test automation', 'Bug tracking tools'],
      posted: '3 days ago',
      saved: false
    },
    {
      id: 28,
      title: 'Environmental Scientist',
      company: 'Green Solutions',
      location: 'Mossel Bay, Western Cape',
      type: 'Full-time',
      salary: 'R420K - R580K',
      remote: false,
      industry: 'Environmental',
      description: 'Conduct environmental impact assessments and research.',
      requirements: ['Environmental Science degree', 'EIA experience', 'GIS skills'],
      posted: '1 week ago',
      saved: false
    },
    {
      id: 29,
      title: 'Operations Manager',
      company: 'Manufacturing Corp',
      location: 'Vanderbijlpark, Gauteng',
      type: 'Full-time',
      salary: 'R650K - R850K',
      remote: false,
      industry: 'Manufacturing',
      description: 'Oversee daily operations and improve efficiency.',
      requirements: ['Operations management', 'Lean manufacturing', 'Team leadership'],
      posted: '4 days ago',
      saved: false
    },
    {
      id: 30,
      title: 'Legal Advisor',
      company: 'Law Associates',
      location: 'Grahamstown, Eastern Cape',
      type: 'Full-time',
      salary: 'R480K - R680K',
      remote: false,
      industry: 'Legal',
      description: 'Provide legal advice and represent clients in court.',
      requirements: ['Law degree', 'Admitted attorney', 'Litigation experience'],
      posted: '5 days ago',
      saved: false
    }
  ];

  const industries = [
    'Technology', 'Analytics', 'Design', 'Marketing', 'Finance', 'Healthcare', 
    'Retail', 'Education', 'Engineering', 'Media', 'Consulting', 'Hospitality',
    'Social Services', 'Human Resources', 'Veterinary', 'Logistics', 'Construction',
    'Manufacturing', 'Environmental', 'Legal'
  ];
  
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = !jobType || job.type === jobType;
    const matchesIndustry = !industry || job.industry === industry;
    const matchesRemote = !remoteOnly || job.remote;
    
    return matchesSearch && matchesLocation && matchesType && matchesIndustry && matchesRemote;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Search</h1>
          <p className="text-gray-600">
            Find your next opportunity with AI-powered job matching across South Africa
          </p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Filter className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Search Filters</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Job title or company"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location (city, province)"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Job Types</option>
                {jobTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Industries</option>
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remoteOnly"
                checked={remoteOnly}
                onChange={(e) => setRemoteOnly(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remoteOnly" className="ml-2 text-sm text-gray-700">
                Remote work only
              </label>
            </div>
          </div>
        </div>

        {/* Job Results */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredJobs.length} Jobs Found
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredJobs.map(job => (
              <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 mr-3">{job.title}</h3>
                      {job.remote && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Remote
                        </span>
                      )}
                    </div>
                    <p className="text-lg text-blue-600 font-medium mb-2">{job.company}</p>
                    <p className="text-gray-600 mb-4">{job.description}</p>
                  </div>
                  
                  <button className="ml-4 p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200">
                    <Bookmark className={`h-5 w-5 ${job.saved ? 'fill-current text-blue-600' : ''}`} />
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    {job.salary}
                  </div>
                  <div className="text-gray-500">
                    Posted {job.posted}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    Apply Now
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSearchPage;