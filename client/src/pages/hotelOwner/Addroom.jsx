import React, { useState } from 'react';
import Title from '../../components/Title';
import { assets } from '../../assets/assets';

const Addroom = () => {
  const [images, setImages] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
  });

  const [inputs, setInputs] = useState({
    roomType: '',
    pricePerNight: 0,
    amenities: {
      'Free WiFi': false,
      'Free Breakfast': false,
      'Room Service': false,
      'Mountain View': false,
      'Pool Access': false,
    },
  });

  return (
    <form className='p-6 max-w-8xl mx-auto'>
      <Title
        align='left'
        font='outfit'
        title='Add Room'
        subTitle='Fill in the details carefully with accurate room details, pricing, and amenities to enhance the user booking experience'
      />

      {/* Upload area for images */}
      <p className='text-gray-800 mt-10 font-medium'>Images</p>
      <div className='grid grid-cols-2 sm:flex gap-4 my-2 flex-wrap'>
        {Object.keys(images).map((key) => (
          <label htmlFor={`roomImage${key}`} key={key} className='cursor-pointer'>
            <div className='w-28 h-28 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden bg-gray-50 hover:border-blue-400 transition'>
              {images[key] ? (
                <img
                  className='w-full h-full object-cover'
                  src={URL.createObjectURL(images[key])}
                  alt={`Room ${key}`}
                />
              ) : (
                <div className='text-center opacity-50 text-sm'>
                  <img src={assets.uploadIcon} alt='upload' className='w-6 h-6 mx-auto mb-1' />
                  Upload
                </div>
              )}
            </div>
            <input
              type='file'
              accept='image/*'
              id={`roomImage${key}`}
              hidden
              onChange={(e) =>
                setImages({ ...images, [key]: e.target.files[0] })
              }
            />
          </label>
        ))}
      </div>

      {/* Room Type & Price */}
      <div className='flex flex-col sm:flex-row gap-4 mt-6'>
        <div className='flex-1 max-w-xs'>
          <p className='text-gray-800 mb-1'>Room Type</p>
          <select
            value={inputs.roomType}
            onChange={(e) =>
              setInputs({ ...inputs, roomType: e.target.value })
            }
            className='w-full border border-gray-300 rounded px-3 py-2'
          >
            <option value=''>Select Room Type</option>
            <option value='Single Bed'>Single Bed</option>
            <option value='Double Bed'>Double Bed</option>
            <option value='Luxury Room'>Luxury Room</option>
            <option value='Family Suite'>Family Suite</option>
          </select>
        </div>

        <div className='flex-1 max-w-xs'>
          <p className='text-gray-800 mb-1'>
            Price <span className='text-xs font-light'>/night</span>
          </p>
          <input
            type='number'
            placeholder='0'
            className='w-full border border-gray-300 rounded px-3 py-2'
            value={inputs.pricePerNight}
            onChange={(e) =>
              setInputs({ ...inputs, pricePerNight: e.target.value })
            }
          />
        </div>
      </div>

      {/* Amenities */}
      <p className='text-gray-800 mt-6 font-medium'>Amenities</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 text-sm text-gray-700'>
        {Object.keys(inputs.amenities).map((amenity, index) => (
          <label key={index} className='flex items-center gap-2'>
            <input
              type='checkbox'
              id={`amenities${index + 1}`}
              checked={inputs.amenities[amenity]}
              onChange={() =>
                setInputs({
                  ...inputs,
                  amenities: {
                    ...inputs.amenities,
                    [amenity]: !inputs.amenities[amenity],
                  },
                })
              }
              className='accent-blue-600'
            />
            {amenity}
          </label>
        ))}
      </div>

      {/* Add Button */}
      <button
        type='submit'
        className='bg-blue-600 text-white px-8 py-2 rounded mt-8 hover:bg-blue-700 transition'
      >
        Add Room
      </button>
    </form>
  );
};

export default Addroom;
