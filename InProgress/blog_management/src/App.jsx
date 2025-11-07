import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import {Routes, Route } from "react-router";
import Home from "./pages/Home";
import Error from "./pages/Error";
import UserLists from "./pages/admin/users/UserLists";
import Edit from "./pages/admin/users/Edit";
import AdminLayout from "./layouts/AdminLayout";
import AppLayout from "./layouts/AppLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Email_Verification from "./pages/auth/Email_Verification";
import Forget_Password from "./pages/auth/Forget_Password";
import ProtectedVerifyRoute from "./pages/auth/ProtectedVerifyRoute";
import Set_New_Password from "./pages/auth/Set_New_Password";
import AuthRoute from "../src/pages/auth/AuthRoute";
import Blog from "./pages/blogs/Blog";
import Blogs from "./pages/blogs/Blogs";
import ListBlog from "./pages/admin/blogs/ListBlog";
import EditBlog from "./pages/admin/blogs/EditBlog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import CreatePosts from "./pages/CreatePosts";
import MyBookmarks from "./pages/blogs/MyBookmarks";
import SingleBlogPage from "./pages/admin/blogs/SingleBlogPage";




const App = () => {
  return (
    <>
    <Routes>
      
      // Auth routes
      <Route path="auth">
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route element={<ProtectedVerifyRoute />}>
            <Route path="verify-email" element={<Email_Verification />} />
          </Route>
          <Route path="forget-password" element={<Forget_Password />} />
          <Route path="set-new-password" element={ <Set_New_Password />} />
      </Route>


      // Admin routes
       <Route path="admin" element={<AdminLayout />} >
          <Route index element={
             <AuthRoute allowedRoles={["admin", "user"]}>
              <AdminDashboard />
            </AuthRoute>
            } />

          <Route path="users" element={
            //only admin can vist this page
            <AuthRoute allowedRoles={["admin"]}>
               <UserLists />
            </AuthRoute>
            }
          />
        
             
          <Route path="users/:id" element={
             <AuthRoute allowedRoles={["admin"]}>
              <Edit />
            </AuthRoute>
            } 

            />
            
            <Route path="blogs" element={
             <AuthRoute allowedRoles={["admin"]}>
              <ListBlog />
            </AuthRoute>
            } 
            />
            
            <Route path="blog/:slug" element={
             <AuthRoute allowedRoles={["admin"]}>
              <SingleBlogPage />
            </AuthRoute>
            }
            
            />
          <Route path="*" element={<Error message="Sorry, please enter correct url for admin page" />} />
      </Route>

      //App Routes
      <Route path="/" element={<AppLayout />} >
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blog/:slug" element={<Blog />} />
          <Route path = "about"   element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-posts" element={<CreatePosts />} />
          <Route path="my-bookmarks" element={<MyBookmarks />} />
      </Route>

      <Route path="*" element={<Error />} />
    </Routes>
    </>
  );
};

export default App;
