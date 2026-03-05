import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createClass, getAllClasses, getAllGyms, updateGymClass } from '../service/api';

const AddUpdateGymClass = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('')
    const [time, setTime] = useState('')
    const [price, setPrice] = useState('');  
    const [gymName, setGymName] = useState('');
    const [gymId, setGymId] = useState('');    
    const [gyms, setGyms] = useState([]); 
    const [selectedGymId, setSelectedGymId] = useState('');
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getAllGyms().then((response) => {
            setGyms(response.data);
        }).catch(console.error);
    }, []);

    useEffect(() => {
        if(id) {
            getAllClasses().then((response) => {
                const gymClass = response.data.find(cls => cls.id == id)
                if(gymClass) {
                    setName(gymClass.name || '')
                    setType(gymClass.type || '')     
                    setTime(gymClass.time || '')
                    setPrice(gymClass.price || '')
                    setGymName(gymClass.gymName || '') 
                }
            }).catch(console.error)
        }
    }, [id])


    const saveOrUpdateForm = async (e) => {
        e.preventDefault()

        if(!selectedGymId || selectedGymId === '') {
            alert(`Gym ID is EMPTY! Selected: "${selectedGymId}"\nPlease select gym from dropdown!`)
            console.error('EMPTY selectedGymId:', selectedGymId)
            return
        }
        
        const gymClass = {
            id: id ? parseInt(id) || 0 : 0,           
            name: name.trim(),
            type: type.trim(),                    
            time: time.trim(),                         
            price: parseInt(price) || 0,              
            gymName: gymName.trim() || "Unknown"      
        }
        
        console.log('GymClassDto:', gymClass);
        console.log('Gym ID TYPE:', typeof selectedGymId, selectedGymId);
        
        try{
            if(id){
                await updateGymClass(id, gymClass)
                alert('✅ Gym Program updated Succesfully!')
            }
            else if(selectedGymId && selectedGymId !== ''){
                console.log('Creating class for gym:', selectedGymId);
                await createClass(selectedGymId, gymClass)
                alert ('Gym Program created Succesfully!')
            }else{
                alert('⚠️ Please select a gym!')
                return;
            }
            navigate('/admin')
        }catch(error){
            console.error('Error', error.response?.data);
            alert('Failed to save gym Program!')

        }
    }

  return (
    <div className='container mt-5'>
        <div className='row justify-content-center'>
            <div className='col md-8'>
                <div className='card shadow'>
                    <div className='card-header bg-success text-white'>
                        <h2 className='text-center mb-0'>{id ? 'Update Gym Program' : 'Add Gym Program'}</h2>
                    </div>
                    <div className='mb-3'>
                            <form onSubmit={saveOrUpdateForm}>
                                <div className='card-body'>
                                    <div className='mb-3'>
                                        <label className='form-label fw-bold'>Select Gym *</label>
                                        <select 
                                            className='form-control' 
                                            value={selectedGymId}
                                            onChange={(e) => setSelectedGymId(e.target.value)}
                                            required>
                                            <option value="">Choose Gym</option>
                                            {gyms.map(gym => (
                                                <option key={gym.id} value={gym.id}>
                                                    {gym.name} ({gym.location})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label fw-bold'>Program Name</label>
                                        <input type='text'
                                                required minLength='2'
                                                className='form-control'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder='Example(Strength Training, HIIT)'/>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label fw-bold'>Type</label>
                                        <input type='text'
                                                required minLength='2'
                                                className='form-control'
                                                value={type}
                                                onChange={(e) => setType(e.target.value)}
                                                placeholder='Example(Yoga, Zumba)'/>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label fw-bold'>Time</label>
                                        <input type='time'
                                                required
                                                className='form-control'
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}/>
                                    </div>
                                    <div className='mb-3'>
                                        <label className='form-label fw-bold'>Price</label>
                                        <input type='number'
                                                required min='0'
                                                className='form-control'
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                placeholder='Enter Amount'/>
                                    </div>
                                    <div className='card-footer d-flex gap-2 justify-content-between'>
                                        <button 
                                            type='button' 
                                            className='btn btn-secondary'
                                            onClick={() => navigate('/admin?tab=classes')}>
                                            ← Back to Admin
                                        </button>
                                        <button type='submit' className='btn btn-success'
                                                onClick={() => navigate('/admin?tab=classes')}>
                                            {id ? 'Update' : 'Create'} Class
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default AddUpdateGymClass