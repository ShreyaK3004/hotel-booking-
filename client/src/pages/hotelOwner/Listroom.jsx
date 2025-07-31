import React, { useState } from 'react'
import { roomsDummyData } from '../../assets/assets'
import Title from '../../components/Title'

const Listroom = () => {
  const [rooms, setRooms] = useState(roomsDummyData)

  return (
    <div className="p-4">
      <Title
        align='left'
        font='outfit'
        title='Room Listings'
        subTitle='View, edit, or manage all listed rooms. Keep the information up-to-date to provide the best experience for users.'
      />

      <p className='text-gray-500 mt-8 mb-2'>All Rooms</p>

      {/* Smaller scrollable box */}
      <div className='w-full max-w-2xl max-h-64 overflow-y-scroll border border-gray-300 rounded-lg shadow-sm'>
        <table className='w-full text-left table-auto'>
          <thead className='sticky top-0 bg-white border-b'>
            <tr>
              <th className='py-2 px-3 text-gray-800 text-sm font-medium'>Name</th>
              <th className='py-2 px-3 text-gray-800 text-sm font-medium max-sm:hidden'>Facility</th>
              <th className='py-2 px-3 text-gray-800 text-sm font-medium'>Price / night</th>
              <th className='py-2 px-3 text-gray-800 text-sm font-medium text-center'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-sm'>
            {rooms.map((item, index) => (
              <tr key={index} className='border-t hover:bg-gray-50'>
                <td className='py-2 px-3 text-gray-700'>{item.roomType}</td>
                <td className='py-2 px-3 text-gray-700 max-sm:hidden'>{item.amenities.join(', ')}</td>
                <td className='py-2 px-3 text-gray-700'>{item.pricePerNight}</td>
                <td className='py-2 px-3 text-center'>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      className='sr-only peer'
                      checked={item.isAvailable}
                      readOnly
                    />
                    <div className='w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200'></div>
                    <span className='absolute left-1 top-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Listroom;