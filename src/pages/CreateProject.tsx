
import React, { useState } from 'react';
import axios from 'axios';
import { IProject } from '../type';
import { useNavigate } from 'react-router-dom';
  import { ImagePlus, LinkIcon, Loader2 } from 'lucide-react';
  import Navbar from '../components/Navbar';

const CreateProject: React.FC = () => {
 const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<IProject>({
    _id:0,
    coverImageUrl:'',
    price:0,
    description:'',
    title:'',
    longdescription:'',
    liveLink:'',
    techStack:''
  });

  const techStackOptions = [
    'MERN', 'Java', 'Node.js', 'Python', 'Django', 'Flask', 'Ruby on Rails', 'Angular', 'Go', 'Rust'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("https://akatsuki-cohert-api.vercel.app/api/projects/create", formData);
      console.log('Project created successfully:', response.data);
    } catch (error) {
      console.error("Unexpected Error occured:", error);
    } finally {
      setLoading(false);
      navigate('/dashboard');
    }
  };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]: name === 'price' ? (value === '' ? 0 : Number(value)) : value,
      }));
    };

    
  
  return (
    <div className="min-h-screen bg-black">
      <Navbar/>

      <div className="container mx-auto px-4 my-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Create New Project
            </h1>
            <p className="mt-2 text-gray-400">Share your amazing project with the world</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-gray-900/50 rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-4">Basic Information</h2>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                  Project Title
                </label>
                <input
                  type="text"
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-white bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
                  placeholder="Enter your project title"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                  Short Description
                </label>
                <textarea
                  id="description"
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 text-white bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
                  placeholder="Brief description of your project"
                />
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-4">Media & Links</h2>

              <div>
                <label htmlFor="coverImageUrl" className="block text-sm font-medium text-gray-300 mb-2">
                  Cover Image
                </label>
                <div className="flex gap-4">
                  <input
                    type="url"
                    id="coverImageUrl"
                    name='coverImageUrl'
                    value={formData.coverImageUrl}
                    onChange={handleChange}
                    className="flex-1 px-4 py-3 bg-black border text-white border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
                    placeholder="Enter image URL"
                  />
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                    {formData.coverImageUrl ? (
                      <img
                        src={formData.coverImageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '';
                        }}
                      />
                    ) : (
                      <ImagePlus className="w-8 h-8 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="liveLink" className="block text-sm font-medium text-gray-300 mb-2">
                  Live Demo URL
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LinkIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="url"
                    id="liveLink"
                    name='liveLink'
                    value={formData.liveLink}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 text-white bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
                    placeholder="https://your-demo-url.com"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-6 space-y-6">
              <h2 className="text-xl font-semibold text-purple-400 mb-4">Project Details</h2>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tech Stack
                </label>
                <select
                  name='techStack'
                  value={formData.techStack}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-black border border-gray-700 text-gray-300 rounded-lg focus:border-purple-500 focus:ring-purple-500"
                >
                  <option value="">Select a tech stack</option>
                  {techStackOptions.map((tech) => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              <div className="max-w-xs">
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-2">
                  Price (INR)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    type="number"
                    id="price"
                    name='price'
                    value={formData.price === 0 ? '' : formData.price} 
                    onChange={handleChange}
                    className="w-full pl-8 text-white pr-4 py-3 bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
                    placeholder="0.00"
                    min={0}
                    step="1"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-300 mb-2">
                  Detailed Description
                </label>
                <textarea
                  id="details"
                  name="longdescription"
                  value={formData.longdescription}
                  onChange={handleChange}
                  rows={8}
                  className="w-full px-4 py-3 text-white bg-black border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50"
                  placeholder="Write detailed description of your project"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 bg-gradient-to-r from-purple-400 to-pink-500 text-white font-medium rounded-lg
                          hover:from-purple-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 
                          focus:ring-offset-2 focus:ring-offset-black ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Creating...
                  </div>
                ) : (
                  'Create Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
