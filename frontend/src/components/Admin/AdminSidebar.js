


// // import React, { useState } from 'react';
// // import styled from 'styled-components';
// // import { Link } from 'react-router-dom';
// // import * as FaIcons from 'react-icons/fa';
// // import { motion } from 'framer-motion';

// // import * as AiIcons from 'react-icons/ai';
// // import { AdminSidebarData } from './AdminSidebarData.js';
// // import AdminSubMenu from './AdminSubMenu';
// // import { IconContext } from 'react-icons/lib';
// // import Widgets from './widgets/Widgets';
// // import Featured from './Featuredchart/Featured';
// // import Chart from './Chart/Chart';
// // import List from './table/Table';
// // import './widgets/widgets.css';
// // const Nav = styled.div`
// //   background-color: #1e1e2f;
// //   height: 80px;
// //   display: flex;
// //   justify-content: flex-start;
// //   align-items: center;
// //   font-family: "Poppins", sans-serif;
// // `;

// // const NavIcon = styled(Link)`
// //   margin-left: 2rem;
// //   font-size: 2rem;
// //   height: 80px;
// //   display: flex;
// //   justify-content: flex-start;
// //   align-items: center;
// //   font-family: "Poppins", sans-serif;
// //   background-color: #1e1e2f;
// // `;

// // const sidebarVariants = {
// //   open: {
// //     width: '345px',
// //     left: '0',
// //     transition: {
// //       type: 'spring',
// //       stiffness: 150,
// //       damping: 20,
// //     },
// //   },
// //   closed: {
// //     width: '80px',
// //     left: '-345px',
// //     transition: {
// //       type: 'spring',
// //       stiffness: 150,
// //       damping: 20,
// //     },
// //   },
// // };

// // const contentVariants = {
// //   open: {
// //     marginLeft: '345px',
// //     transition: {
// //       type: 'spring',
// //       stiffness: 150,
// //       damping: 20,
// //     },
// //   },
// //   closed: {
// //     marginLeft: '0px',
// //     transition: {
// //       type: 'spring',
// //       stiffness: 150,
// //       damping: 20,
// //     },
// //   },
// // };


// // const SidebarNav = styled(motion.nav)`
// //   background-color: #1e1e2f;
// //   width: 345px;
// //   height: 100vh;
// //   display: flex;
// //   justify-content: center;
// //   position: fixed;
// //   top: 0;
// //   left: ${({ sidebar }) => (sidebar ? '0' : '-345px')};
// //   z-index: 10;
// // `;

// // const SidebarWrap = styled(motion.div)`
// //   width: 100%;
// //   flex: 1;
// // `;

// // const AdminContainer = styled(motion.div)`
 
// //   margin-left: ${({ sidebar }) => (sidebar ? '345px' : '80px')};
// //   transition: margin-left 0.3s ease-in-out;
// //   background-color: #1e1e2f;
// // `;

// // const AdminSidebar = () => {
// //   const [sidebarOpen, setSidebarOpen] = useState(true);

// //   const toggleSidebar = () => {
// //     setSidebarOpen(!sidebarOpen);
// //   };

// //   return (
// //     <>
// //       <motion.div>
// //         <IconContext.Provider value={{ color: '#fff' }}>
// //           <Nav>
// //             <NavIcon to=''>
// //               <FaIcons.FaBars onClick={toggleSidebar} />
// //             </NavIcon>
// //             <NavIcon to='/Home'>
// //               <AiIcons.AiFillHome />
// //             </NavIcon>
// //           </Nav>

// //           <SidebarNav
// //             initial={sidebarOpen ? 'open' : 'closed'}
// //             animate={sidebarOpen ? 'open' : 'closed'}
// //             variants={sidebarVariants}
// //             sidebar={sidebarOpen}
// //           >
// //             <SidebarWrap
// //               initial={sidebarOpen ? 'open' : 'closed'}
// //               animate={sidebarOpen ? 'open' : 'closed'}
// //               variants={sidebarVariants}
// //               sidebar={sidebarOpen}
// //             >
// //               <NavIcon to=''>
// //                 <AiIcons.AiOutlineClose onClick={toggleSidebar} />
// //               </NavIcon>
// //               {AdminSidebarData.map((item, index) => {
// //                 return <AdminSubMenu item={item} key={index} />;
// //               })}
// //             </SidebarWrap>
// //           </SidebarNav>

// //           <AdminContainer
// //             initial={sidebarOpen ? 'open' : 'closed'}
// //             animate={sidebarOpen ? 'open' : 'closed'}
// //             variants={contentVariants}
// //             sidebar={sidebarOpen}
// //           >
// //             <div className='widgets'>
// //               <Widgets type='user' />
// //               <Widgets type='books' />
// //               <Widgets type='status' />
// //             </div>
// //             <div className='charts'>
// //               <Featured />
// //               <Chart />
// //             </div>
// //             <div className='listContainer'>
// //               <div className='listTitle'>Latest issues</div>
// //               <List />
// //             </div>
// //           </AdminContainer>
// //         </IconContext.Provider>
// //       </motion.div>
// //     </>
// //   );
// // };

// // export default AdminSidebar;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';
// import * as FaIcons from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import Widgets from './widgets/Widgets';

// import * as AiIcons from 'react-icons/ai';
// import { IconContext } from 'react-icons/lib';
// import AdminSubMenu from './AdminSubMenu';
// import { AdminSidebarData } from './AdminSidebarData';

// const Nav = styled.div`
//   background-color: #1e1e2f;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   font-family: 'Poppins', sans-serif;
// `;

// const NavIcon = styled(Link)`
//   margin-left: 2rem;
//   font-size: 2rem;
//   height: 80px;
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   font-family: 'Poppins', sans-serif;
//   background-color: #1e1e2f;
// `;

// const sidebarVariants = {
//   open: {
//     width: '345px',
//     left: '0',
//     transition: {
//       type: 'spring',
//       stiffness: 150,
//       damping: 20,
//     },
//   },
//   closed: {
//     width: '80px',
//     left: '-345px',
//     transition: {
//       type: 'spring',
//       stiffness: 150,
//       damping: 20,
//     },
//   },
// };

// const contentVariants = {
//   open: {
//     marginLeft: '345px',
//     transition: {
//       type: 'spring',
//       stiffness: 150,
//       damping: 20,
//     },
//   },
//   closed: {
//     marginLeft: '0px',
//     transition: {
//       type: 'spring',
//       stiffness: 150,
//       damping: 20,
//     },
//   },
// };

// const SidebarNav = styled(motion.nav)`
//   background-color: #1e1e2f;
//   width: 345px;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   position: fixed;
//   top: 0;
//   left: ${({ sidebar }) => (sidebar ? '0' : '-345px')};
//   z-index: 10;
// `;

// const SidebarWrap = styled(motion.div)`
//   width: 100%;
//   flex: 1;
// `;

// const AdminSidebar = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <Nav>
//           <NavIcon to=''>
//             <FaIcons.FaBars onClick={toggleSidebar} />
//           </NavIcon>
//           <NavIcon to='/Home'>
//             <AiIcons.AiFillHome />
//           </NavIcon>
//         </Nav>

//         <SidebarNav
//           initial={sidebarOpen ? 'open' : 'closed'}
//           animate={sidebarOpen ? 'open' : 'closed'}
//           variants={sidebarVariants}
//           sidebar={sidebarOpen}
//         >
//           <SidebarWrap
//             initial={sidebarOpen ? 'open' : 'closed'}
//             animate={sidebarOpen ? 'open' : 'closed'}
//             variants={sidebarVariants}
//             sidebar={sidebarOpen}
//           >
//             <NavIcon to=''>
//               <AiIcons.AiOutlineClose onClick={toggleSidebar} />
//             </NavIcon>
//             {sidebarOpen &&
//               AdminSidebarData.map((item, index) => (
//                 <AdminSubMenu item={item} key={index} />
//               ))}
//           </SidebarWrap>
//         </SidebarNav>

//         <motion.div
//           initial={sidebarOpen ? 'open' : 'closed'}
//           animate={sidebarOpen ? 'open' : 'closed'}
//           variants={contentVariants}
//           sidebar={sidebarOpen}
//         >
         
//         </motion.div>
//       </IconContext.Provider>
//     </>
//   );
// };

// export default AdminSidebar;
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { AdminSidebarData } from './AdminSidebarData.js';
import AdminSubMenu from './AdminSubMenu';

import { IconContext } from 'react-icons/lib';

const Nav = styled.div`
background: #1e1e2f;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const AdminSidebar = () => {
 
 
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  
          
  
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
    
        <Nav>
       
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
          <NavIcon to='/home'>
          <AiIcons.AiFillHome  />
        </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
           
            {AdminSidebarData.map((item, index) => {
              return <AdminSubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
          }
export default AdminSidebar









