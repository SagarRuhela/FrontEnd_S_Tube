import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import { showUploadPage } from '../../utils/toggleSlice';
import axios from 'axios';
import RollingSVG from '../../assets/Rolling-2.6s-24px (1).svg';


const UploadPage = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', e.target.title.value);
    formData.append('description', e.target.description.value);
    formData.append('videoFile', e.target.videoFile.files[0]);
    formData.append('thumnail', e.target.thumnail.files[0]);

    try {
      setLoading(true)
      const res = await axios.post(`/api/videos/addVideo`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if(res.data.statusCode === 201){
        dispatch(showUploadPage(false));
      }
      setLoading(false);
      formData.delete('title','description','videoFile','thumnail');

    } catch (error) {
      console.error('Error:', error);
    } finally{
      setLoading(false)
    }

  };

  return (
    <div className='absolute top-[30%] right-[30%] bg-purple-500 w-[40vw] h-fit px-10 py-10 rounded-md '>
      <form encType="multipart/form-data" onSubmit={handleVideoUpload}  >
        <label htmlFor="">Title</label>
        <input
          className='w-full mb-4 text-black'
          type="text"
          name='title'
          placeholder='Title'
        />
        <label htmlFor="">*Upload Video</label>
        <input
          className='w-full mb-4'
          type="file"
          name='videoFile'
          accept="video/*"
          placeholder='choose a video file'
        />
        <label htmlFor="">*thumnail</label>
        <input
          className='w-full mb-4'
          type="file"
          name='thumnail'
          accept="image/*"
          placeholder='choose a video file'
        />
        <label htmlFor="">description</label>
        <textarea
          className='w-full mb-4 text-black'
          name="description"
          id=""
          cols="30"
          rows="2"
        ></textarea>
        <button type='submit' className='bg-purple-800 px-5 py-1'
        >upload</button>
        {loading && <img 
        className='absolute top-44 right-64'
        src={RollingSVG} alt="" />}
        <button
          onClick={() => dispatch(showUploadPage(false))}
          className='bg-purple-800 px-5 py-1 ml-10'>cancel</button>
      </form>
    </div>
  );
};

export default UploadPage;
