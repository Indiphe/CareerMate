import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { Users, MessageSquare, ThumbsUp, Reply, Plus } from 'lucide-react';

const CommunityPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showNewPost, setShowNewPost] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'How to negotiate salary for remote positions?',
      author: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'career-advice',
      content: 'I\'ve been offered a remote position and I\'m not sure how to approach salary negotiation. Any tips from those who have successfully negotiated remote salaries?',
      likes: 24,
      replies: 8,
      timeAgo: '2 hours ago',
      tags: ['salary', 'remote-work', 'negotiation']
    },
    {
      id: 2,
      title: 'Best resources for learning data science?',
      author: 'Michael Chen',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'career-advice',
      content: 'I\'m transitioning into data science from a marketing background. What are the best online resources, courses, or bootcamps you\'d recommend?',
      likes: 18,
      replies: 12,
      timeAgo: '4 hours ago',
      tags: ['data-science', 'career-change', 'learning']
    },
    {
      id: 3,
      title: 'Interview went well but no response for 2 weeks',
      author: 'Emily Rodriguez',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'interview-tips',
      content: 'I had what I thought was a great interview 2 weeks ago, but haven\'t heard back. Should I follow up again or move on?',
      likes: 15,
      replies: 6,
      timeAgo: '6 hours ago',
      tags: ['follow-up', 'interview', 'waiting']
    },
    {
      id: 4,
      title: 'Resume feedback for software engineer position',
      author: 'David Park',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'resume-help',
      content: 'I\'ve been applying for software engineer positions but not getting many responses. Would love some feedback on my resume structure and content.',
      likes: 22,
      replies: 15,
      timeAgo: '1 day ago',
      tags: ['resume', 'software-engineer', 'feedback']
    },
    {
      id: 5,
      title: 'Tips for virtual interviews?',
      author: 'Lisa Wang',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'interview-tips',
      content: 'I have my first virtual interview next week. Any specific tips for video interviews that are different from in-person ones?',
      likes: 31,
      replies: 9,
      timeAgo: '1 day ago',
      tags: ['virtual-interview', 'video-call', 'tips']
    },
    {
      id: 6,
      title: 'How to explain employment gaps?',
      author: 'James Miller',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'job-search',
      content: 'I have a 6-month gap in my employment due to personal reasons. How should I address this in interviews and on my resume?',
      likes: 19,
      replies: 11,
      timeAgo: '2 days ago',
      tags: ['employment-gap', 'resume', 'interview']
    },
    {
      id: 7,
      title: 'Transitioning from academia to industry',
      author: 'Dr. Anna Thompson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'career-advice',
      content: 'After 8 years in academia, I\'m looking to transition to industry. How do I translate my research experience into industry-relevant skills?',
      likes: 27,
      replies: 14,
      timeAgo: '3 days ago',
      tags: ['academia', 'industry', 'career-transition']
    },
    {
      id: 8,
      title: 'LinkedIn optimization tips',
      author: 'Mark Rodriguez',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      category: 'job-search',
      content: 'I\'ve been told my LinkedIn profile needs work. What are the most important elements to focus on for job searching?',
      likes: 33,
      replies: 18,
      timeAgo: '4 days ago',
      tags: ['linkedin', 'profile', 'networking']
    }
  ]);

  const [newPost, setNewPost] = useState({
    title: '',
    category: '',
    content: ''
  });

  // Calculate actual category counts
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return posts.length;
    return posts.filter(post => post.category === categoryId).length;
  };

  const categories = [
    { id: 'all', name: 'All Posts', count: getCategoryCount('all') },
    { id: 'job-search', name: 'Job Search', count: getCategoryCount('job-search') },
    { id: 'interview-tips', name: 'Interview Tips', count: getCategoryCount('interview-tips') },
    { id: 'resume-help', name: 'Resume Help', count: getCategoryCount('resume-help') },
    { id: 'career-advice', name: 'Career Advice', count: getCategoryCount('career-advice') }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const handleNewPost = () => {
    if (newPost.title && newPost.category && newPost.content) {
      const post = {
        id: posts.length + 1,
        title: newPost.title,
        author: 'You',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
        category: newPost.category,
        content: newPost.content,
        likes: 0,
        replies: 0,
        timeAgo: 'Just now',
        tags: []
      };
      
      setPosts([post, ...posts]);
      setNewPost({ title: '', category: '', content: '' });
      setShowNewPost(false);
    }
  };

  const totalMembers = 2847;
  const totalPosts = posts.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
          <p className="text-gray-600">
            Connect with fellow job seekers, share experiences, and get advice
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Categories</h2>
              </div>
              <div className="p-4">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex justify-between items-center px-3 py-2 rounded-lg text-left transition-colors duration-200 mb-2 ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Community Stats</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">{totalMembers.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Active Members</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-900">{totalPosts}</p>
                    <p className="text-sm text-gray-600">Total Posts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm mb-6">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Discussion Posts ({filteredPosts.length})
                  </h2>
                  <button
                    onClick={() => setShowNewPost(!showNewPost)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </button>
                </div>
              </div>

              {showNewPost && (
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Post title..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <select 
                      value={newPost.category}
                      onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    <textarea
                      placeholder="Share your question or experience..."
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowNewPost(false)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleNewPost}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="divide-y divide-gray-200">
                {filteredPosts.map(post => (
                  <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {categories.find(c => c.id === post.category)?.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <span className="font-medium">{post.author}</span>
                          <span className="mx-2">•</span>
                          <span>{post.timeAgo}</span>
                        </div>
                        
                        <p className="text-gray-700 mb-4">{post.content}</p>
                        
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <button className="flex items-center hover:text-blue-600 transition-colors duration-200">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {post.likes} likes
                          </button>
                          <button className="flex items-center hover:text-blue-600 transition-colors duration-200">
                            <Reply className="h-4 w-4 mr-1" />
                            {post.replies} replies
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;