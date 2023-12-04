// "use client"
// import React from 'react';
// import useSeatAllocation from './hooks/hooks';
// import Modal from './components/UpModal';
// import Navbar from '../navbar/Navbar';
// import PopupModal from '../popup/PopupModal';

// const seatAllocation: React.FC = () => {
//   const {
//     seats,
//     selectedSeat,
//     showBookModal,
//     showCancelModal,
//     handleSeatClick,
//     handleBookModalConfirm,
//     handleCancelClick,
//     handleCancelModalConfirm,
//   } = useSeatAllocation();

//   return (
//     <>
//     <Navbar/>
//     <div className="flex flex-wrap">
//       {seats.map((seat) => (
//         <div
//           key={seat.id}
//           className={`w-1/5 p-4 m-2 cursor-pointer ${seat.allocated ? 'bg-red-500' : 'bg-green-500'}`}
//           onClick={() => handleSeatClick(seat.id)}
//         >
//           Seat {seat.id}
//           {seat.allocated && <span className="ml-2 text-sm">(Allocated)</span>}
//           {seat.allocated && (
//             <button
//               className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded"
//               onClick={() => handleCancelClick()}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       ))}

//       {showBookModal && (
//         <Modal
//           message={`Do you want to book Seat ${selectedSeat} for 1 hour?`}
//           onConfirm={() => handleBookModalConfirm(true)}
//           onCancel={() => handleBookModalConfirm(false)}
//         />
//       )}

//       {showCancelModal && (
//         <PopupModal 
//         <Modal
//           message={`Do you want to cancel the booking for Seat ${selectedSeat}?`}
//           onConfirm={() => handleCancelModalConfirm(true)}
//           onCancel={() => handleCancelModalConfirm(false)}
//         />
//       )}
//     </div>
//     </>
//   );
// };

// export default seatAllocation;
