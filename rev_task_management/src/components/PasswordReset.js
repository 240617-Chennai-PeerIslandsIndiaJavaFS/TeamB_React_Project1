// import React from "react";
// import "../css/PasswordReset.css";
// import { Link } from "react-router-dom";

// const PasswordResetPage = () => {
//   return (
//     <div className="passwordreset">
//       <nav className="navbar navbar-expand-lg navbar-custom">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">
//             Synergize
//           </a>
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
//             <form className="d-flex" role="search">
//               <button
//                 className="btn btn-outline-light"
//                 type="button"
//                 onClick={() => window.history.back()}
//               >
//                 Go Back
//               </button>
//             </form>
//           </div>
//         </div>
//       </nav>

//       <div className="container-fluid">
//         <div className="row w-100">
//           <div className="col-md-4 d-flex justify-content-center align-items-center">
//             <img src="/MEDIA/akshay logo.png" alt="Logo" className="logo1" />
//           </div>
//           <div className="col-md-8 d-flex justify-content-center align-items-center">
//             <div className="login-container1">
//               <h1>Welcome to Task Management</h1>
//               <br />
//               <form id="login-form">
//                 <div className="mb-3">
//                   <label htmlFor="exampleInputEmail1" className="form-label">
//                     Email address
//                   </label>
//                   <input
//                     type="email"
//                     className="form-control2"
//                     id="exampleInputEmail1"
//                     aria-describedby="emailHelp"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="exampleInputOldPassword1"
//                     className="form-label"
//                   >
//                     Old Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control2"
//                     id="exampleInputOldPassword1"
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label
//                     htmlFor="exampleInputNewPassword1"
//                     className="form-label"
//                   >
//                     New Password
//                   </label>
//                   <input
//                     type="password"
//                     className="form-control2"
//                     id="exampleInputNewPassword1"
//                     required
//                   />
//                 </div>

//                 <div className="button-container">
//                   <Link to="/login">
//                     <button type="reset" className="loginbutton1">
//                       Reset
//                     </button>
//                   </Link>
//                 </div>
//               </form>
//               <div id="message"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PasswordResetPage;
