"use client"
import React from 'react';
import useSeatAllocation from '../components/seat-allocation/hooks/hooks';
import Navbar from '../components/navbar/Navbar';
import PopupModal from '../components/popup/PopupModal';

const SeatAllocation: React.FC = () => {
    const {
        seats,
        selectedSeat,
        showBookModal,
        showCancelModal,
        handleSeatClick,
        handleBookModalConfirm,
        handleCancelClick,
        handleCancelModalConfirm,
    } = useSeatAllocation();

    return (
        <>
            <Navbar />
            <div className="flex flex-wrap">
                {seats.map((seat) => (
                    <div
                        key={seat.id}
                        className={`w-1/5 p-4 m-2 cursor-pointer ${seat.allocated ? 'bg-red-500' : 'bg-green-500'}`}
                        onClick={() => handleSeatClick(seat.id)}
                    >
                        Seat {seat.id}
                        {seat.allocated && <span className="ml-2 text-sm">(Allocated)</span>}
                        {seat.allocated && (
                            <button
                                className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded"
                                onClick={() => handleCancelClick()}
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                ))}

                {showBookModal && (
                    <PopupModal
                        isOpen={showBookModal}
                        onClose={() => handleBookModalConfirm(false)}
                        onConfirm={() => handleBookModalConfirm(true)}
                        message={`Do you want to book Seat ${selectedSeat} for 1 hour?`}
                    />
                )}

                {showCancelModal && (
                    <PopupModal
                        isOpen={showCancelModal}
                        onClose={() => handleCancelModalConfirm(false)}
                        onConfirm={() => handleCancelModalConfirm(true)}
                        message={`Do you want to cancel the booking for Seat ${selectedSeat}?`}
                    />
                )}
            </div>
        </>
    );
};

export default SeatAllocation;
