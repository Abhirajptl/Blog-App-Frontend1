// import React, { useEffect, useState } from 'react'
// // import './Common.css'
// import axios from 'axios';
// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await axios.get(`${apiUrl}/blog`)
//       if(response.status === 200){
//         setBlogs(response.data);
//       } else {
//         setError("Failed to fetch blogs. Please try again later.");
//       }
//       setLoading(false);
//     } catch (error) {
//       setError("Error fetching blogs. Please try again later.");
//       setLoading(false);
//     }
//   }

//   useEffect(() =>{
//     fetchBlogs()
//   },[])

//   const formatDate = (date) => {
//     const options = { year: 'numeric', month: 'long', day: 'numeric'}
//     return new Date(date).toLocaleDateString('en-US', options)
//   }

//   const handleDelete = async (blogId) =>{
//     const token = localStorage.getItem('token');
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.delete(`${apiUrl}/blog/delete/${blogId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })

//       setBlogs(blogs.filter(blog => blog._id !== blogId))

//     } catch (error) {
//       setError("Error deleting blog. Please try again later.");
//       console.log("Error deleting blog:", error);
//     }
//   }

//   const userId = localStorage.getItem('userId');

//   return (
//     <div className='ab'>

//       {loading && <p>Loading Blogs</p>}
//       {error && <p style={{color:'red'}}>{error}</p>}

//       {!loading && !error && <div className="w-full max-w-[800px]">
//         {blogs.length > 0 && (
//           blogs.map((blog) => (
//             <div key={blog._id} className="border p-4 mb-4 rounded-lg shadow-md ">
//               <h3 className="text-xl font-bold">{blog.title}</h3>
//               <p className="text-gray-700">{blog.content}</p>
//               <p className="text-sm text-gray-500">Posted by: {blog.author.username}</p>
//               <p className="text-sm text-gray-500">Published on: {formatDate(blog.createdAt)}</p>
//               { userId === blog.author._id && <button onClick={() => handleDelete(blog._id)}>Delete</button>}
//             </div>
//           ))
//         )}
//       </div>}
//     </div>
//   )
// }

// export default Blogs

// import React, { useEffect, useState } from "react";
// // import './Common.css'
// import axios from "axios";
// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [editBlog, setEditBlog] = useState(null); // State to track the blog being edited
//   const [updatedTitle, setUpdatedTitle] = useState("");
//   const [updatedContent, setUpdatedContent] = useState("");

//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await axios.get(`${apiUrl}/blog`);
//       if (response.status === 200) {
//         setBlogs(response.data);
//       } else {
//         setError("Failed to fetch blogs. Please try again later.");
//       }
//       setLoading(false);
//     } catch (error) {
//       setError("Error fetching blogs. Please try again later.");
//       setLoading(false);
//     }
//   };
  

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const formatDate = (date) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(date).toLocaleDateString("en-US", options);
//   };

//   const handleDelete = async (blogId) => {
//     const token = localStorage.getItem("token");
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       await axios.delete(`${apiUrl}/blog/delete/${blogId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setBlogs(blogs.filter((blog) => blog._id !== blogId));
//     } catch (error) {
//       setError("Error deleting blog. Please try again later.");
//       console.log("Error deleting blog:", error);
//     }
//   };

//   const handleUpdate = async (blogId) => {
//     const token = localStorage.getItem("token");
//     try {
//       const apiUrl = import.meta.env.VITE_API_URL;
//       const response = await axios.put(
//         `${apiUrl}/blog/update/${blogId}`,
//         {
//           title: updatedTitle,
//           content: updatedContent,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Blog updated successfully");
//       setEditBlog(null); // Close the edit form
//       fetchBlogs(); // Refresh the blogs
//     } catch (error) {
//       console.error("Error updating blog:", error.response || error.message);
//       setError("Error updating blog. Please try again later.");
//     }
//   };

//   const userId = localStorage.getItem("userId");

//   return (
//     <div className="ab">
//       {loading && <p>Loading Blogs</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {!loading && !error && (
//         <div className="w-full max-w-[800px]">
//           {blogs.length > 0 &&
//             blogs.map((blog) => (
//               <div
//                 key={blog._id}
//                 className="border p-4 mb-4 rounded-lg shadow-md "
//               >
//                 <h3 className="text-xl font-bold">{blog.title}</h3>
//                 <p className="text-gray-700">{blog.content}</p>
//                 <p className="text-sm text-gray-500">
//                   Posted by: {blog.author.username}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   Published on: {formatDate(blog.createdAt)}
//                 </p>
//                 {userId === blog.author._id && (
//                   <button onClick={() => handleDelete(blog._id)}>Delete</button>
//                 )}

//                 {userId === blog.author._id && (
//                   <>
//                     <button
//                       onClick={() => setEditBlog(blog._id)}
//                       className="mr-2 bg-blue-500 text-white px-4 py-2 rounded"
//                     >
//                       Update
//                     </button>
//                   </>
//                 )}

//                 {editBlog === blog._id && (
//                   <div className="mt-4">
//                     <input
//                       type="text"
//                       placeholder="Updated Title"
//                       value={updatedTitle}
//                       onChange={(e) => setUpdatedTitle(e.target.value)}
//                       className="border p-2 mb-2 w-full"
//                     />
//                     <textarea
//                       placeholder="Updated Content"
//                       value={updatedContent}
//                       onChange={(e) => setUpdatedContent(e.target.value)}
//                       className="border p-2 mb-2 w-full"
//                     />
//                     <button
//                       onClick={() => handleUpdate(blog._id)}
//                       className="bg-green-500 text-white px-4 py-2 rounded"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditBlog(null)}
//                       className="ml-2 bg-gray-500 text-white px-4 py-2 rounded"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Blogs;



// 3
import React, { useEffect, useState } from "react";
import axios from "axios";
// import "./Common.css"; 
import "./Blogs.css"; 

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // Stores the blogs
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [editBlog, setEditBlog] = useState(null); // Tracks the blog being edited
  const [updatedTitle, setUpdatedTitle] = useState(""); // Updated title for editing
  const [updatedContent, setUpdatedContent] = useState(""); // Updated content for editing
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination

  const userId = localStorage.getItem("userId"); // Logged-in user's ID

  // Fetch blogs with pagination
  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      console.log("Fetching blogs from:", `${apiUrl}/blog?page=${page}&limit=5`); // Debugging
  
      const response = await axios.get(`${apiUrl}/blog?page=${page}&limit=5`);
      console.log("API Response:", response.data); // Debugging
  
      if (response.status === 200) {
        setBlogs(response.data.blogs || []); // Ensure blogs is always an array
        setTotalPages(response.data.totalPages || 1); // Set total pages
        setCurrentPage(response.data.currentPage || 1); // Set current page
      } else {
        setError("Failed to fetch blogs. Please try again later.");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error.response || error.message); // Debugging
      setError("Error fetching blogs. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch blogs on component mount
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle blog deletion
  const handleDelete = async (blogId) => {
    const token = localStorage.getItem("token");
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${apiUrl}/blog/delete/${blogId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(blogs.filter((blog) => blog._id !== blogId)); // Remove deleted blog from state
    } catch (error) {
      setError("Error deleting blog. Please try again later.");
    }
  };

  // Handle blog update
  const handleUpdate = async (blogId) => {
    const token = localStorage.getItem("token");
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      await axios.put(
        `${apiUrl}/blog/update/${blogId}`,
        { title: updatedTitle, content: updatedContent },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Blog updated successfully");
      setEditBlog(null); // Close the edit form
      fetchBlogs(currentPage); // Refresh blogs for the current page
    } catch (error) {
      setError("Error updating blog. Please try again later.");
    }
  };

  // Format date for display
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  return (
    <div className="ab">
      {loading && <p>Loading Blogs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <div className="w-full max-w-[800px]">
          {blogs.length > 0 &&
            blogs.map((blog) => (
              <div
                key={blog._id}
                className="border p-4 mb-4 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold">Title - {blog.title}</h3>
                <p className="text-gray-700">Content - {blog.content}</p>
                <p className="text-sm text-gray-500">
                  Posted by: {blog.author.username}
                </p>
                <p className="text-sm text-gray-500">
                  Published on: {formatDate(blog.createdAt)}
                </p>
                {userId === blog.author._id && (
                  <>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setEditBlog(blog._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                      Update
                    </button>
                  </>
                )}

                {editBlog === blog._id && (
                  <div className="update-form">
                    <input
                      type="text"
                      placeholder="Update Title"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                      className="border p-2 mb-2 w-full"
                    />
                    <textarea
                      placeholder="Update Content"
                      value={updatedContent}
                      onChange={(e) => setUpdatedContent(e.target.value)}
                      className="border p-2 mb-2 w-full"
                    />
                    <button
                      onClick={() => handleUpdate(blog._id)}
                      className="save-button"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditBlog(null)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            ))}

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => fetchBlogs(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded mr-2 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              onClick={() => fetchBlogs(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded ml-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {!loading && !error && blogs.length === 0 && (
        <p>No blogs available. Please check back later.</p>
      )}
    </div>
  );
};

export default Blogs;




