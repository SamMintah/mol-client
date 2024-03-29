import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import profile from "../../assets/profile.jpg";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { pathname } = useLocation();
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   
  const handleLogout = async() => {
    try {
      await newRequest.post("/auth/logout")
      localStorage.setItem("currentUser", null);
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span>mol..</span>
          </Link>
        </div>
        <div className="links">
          <span>mol Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.username && (
            <Link to="/login" className="link">
              Sign In
            </Link>
          )}
          {!currentUser?.isSeller && <span>Become A seller</span>}
          {!currentUser &&   <Link to="/register" className="link">
          <button>Join</button>
            </Link>}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/gigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/myGigs" className="link">
                    myGigs
                  </Link>

                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link to="/logout" className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// // import newRequest from "../../utils/newRequest";
// import "./Navbar.scss";

// function Navbar() {
//   const [active, setActive] = useState(true);
//   const [open, setOpen] = useState(true);

//   const { pathname } = useLocation();

//   const isActive = () => {
//     window.scrollY > 0 ? setActive(true) : setActive(false);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", isActive);
//     return () => {
//       window.removeEventListener("scroll", isActive);
//     };
//   }, []);

//   const currentUser = JSON.parse(localStorage.getItem("currentUser"));

//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//     //   await newRequest.post("/auth/logout");
//       localStorage.setItem("currentUser", null);
//       navigate("/");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
//       <div className="container">
//         <div className="logo">
//           <Link className="link" to="/">
//             <span className="text">Workr</span>
//           </Link>
//         </div>
//         <div className="links">
//           <span>Workr Business</span>
//           <span>Explore</span>
//           <span>English</span>
//           {!currentUser?.isSeller && <span>Become a Seller</span>}
//           {currentUser ? (
//             <div className="user" onClick={() => setOpen(!open)}>
//               <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
//               <span>{currentUser?.username}</span>
//               {open && (
//                 <div className="options">
//                   {currentUser.isSeller && (
//                     <>
//                       <Link className="link" to="/mygigs">
//                         Gigs
//                       </Link>
//                       <Link className="link" to="/add">
//                         Add New Gig
//                       </Link>
//                     </>
//                   )}
//                   <Link className="link" to="/orders">
//                     Orders
//                   </Link>
//                   <Link className="link" to="/messages">
//                     Messages
//                   </Link>
//                   <Link className="link" onClick={handleLogout}>
//                     Logout
//                   </Link>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <>
//               <Link to="/login" className="link">Sign in</Link>
//               <Link className="link" to="/register">
//                 <button>Join</button>
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//       {(active || pathname !== "/") && (
// <>
//   <hr />
//   <div className="menu">
//     <Link className="link menuLink" to="/">
//       Graphics & Design
//     </Link>
//     <Link className="link menuLink" to="/">
//       Video & Animation
//     </Link>
//     <Link className="link menuLink" to="/">
//       Writing & Translation
//     </Link>
//     <Link className="link menuLink" to="/">
//       AI Services
//     </Link>
//     <Link className="link menuLink" to="/">
//       Digital Marketing
//     </Link>
//     <Link className="link menuLink" to="/">
//       Music & Audio
//     </Link>
//     <Link className="link menuLink" to="/">
//       Programming & Tech
//     </Link>
//     <Link className="link menuLink" to="/">
//       Business
//     </Link>
//     <Link className="link menuLink" to="/">
//       Lifestyle
//     </Link>
//   </div>
//   <hr />
// </>
//       )}
//     </div>
//   );
// }

// export default Navbar;
