import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createGym, getGymById, updateGym } from '../service/api'

const AddGym = () => {
    const [imageUrl, setImageUrl] = useState('')
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [address, setAddress] = useState('')
    const [priceRange, setPriceRange] = useState('')
    const [rating, setRating] = useState(0)
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(id){
            getGymById(id).then((response) => {
                setImageUrl(response.data.imageUrl || '')
                setName(response.data.name || '')
                setLocation(response.data.location || '')
                setAddress(response.data.address || '')
                setPriceRange(response.data.priceRange || '')
                setRating(response.data.rating || '')
            }).catch(console.error)
        }
    }, [id])

    const saveOrUpdateForm = async (e) => {
        e.preventDefault()
        
        const gym = {
            id: id ? parseInt(id) || 0 : 0,   
            imageUrl: imageUrl.trim(),          
            name: name.trim(),
            location: location.trim(),
            address: address.trim(),
            priceRange: priceRange.trim(),
            rating: parseFloat(rating),

            count: 0                             
        }
        
        console.log('📤 EXACT GymDto:', gym)

        try {
            if(id) {
                await updateGym(id, gym)
                alert('✅ Gym updated Succesfully!')
            } else {
                await createGym(gym)
                alert('✅ Gym created Succesfully!')
            }
            navigate('/admin?tab=gyms')
        } catch (error) {
            console.error('Error:', error.response?.data)
            alert('Failed to save gym!')
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card shadow'>
                        <div className='card-header bg-primary text-white'>
                            <h2 className='text-center mb-0'>{id ? 'Update Gym' : 'Add Gym'}</h2>
                        </div>
                        <form onSubmit={saveOrUpdateForm}>
                            <div className='card-body'>
                                <div className='mb-3'>
                                    <label className='form-label fw-bold'>Image URL *</label>
                                    <input 
                                        type='url'
                                        className='form-control'
                                        placeholder='https://images.unsplash.com/photo-...'
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                    {imageUrl && (
                                        <div className='mt-2'>
                                            <img 
                                                src={imageUrl} 
                                                alt='Gym Preview' 
                                                className='rounded shadow'
                                                style={{ width: '200px', height: '150px', objectFit: 'cover' }}
                                            />
                                        </div>
                                    )}
                                    <div className='form-text'>
                                        Paste Unsplash gym image URL (e.g., https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400)
                                    </div>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label fw-bold'>Gym Name *</label>
                                    <input 
                                        type='text' 
                                        required 
                                        minLength='2'
                                        className='form-control'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder='Gym Name'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label fw-bold'>Location *</label>
                                    <input 
                                        type='text' 
                                        required 
                                        minLength='2'
                                        className='form-control'
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        placeholder='Example (Pune, Nagpur)'
                                    />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label fw-bold'>Full Address</label>
                                    <input 
                                        type='text' 
                                        className='form-control'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        placeholder='89 Manish Nagar, Nagpur, MH 440016'
                                    />
                                </div>
                                 <div className='row'>
                                    <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-bold'>Rating</label>
                                        <input 
                                            type='number' 
                                            min='0' 
                                            max='5' 
                                            step='0.1'
                                            className='form-control'
                                            value={rating}
                                            onChange={(e) => setRating(parseFloat(e.target.value) || 0)}
                                            placeholder='4.5'
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6 mb-3'>
                                        <label className='form-label fw-bold'>Price Range</label>
                                        <input 
                                            type='text' 
                                            className='form-control'
                                            value={priceRange}
                                            onChange={(e) => setPriceRange(e.target.value)}
                                            placeholder='₹1500-₹2700'
                                        />
                                </div>
                            </div>
                            <div className='card-footer d-flex gap-2 justify-content-between '>
                                <button 
                                    type='button' 
                                    className='btn btn-secondary'
                                    onClick={() => navigate('/admin?tab=gyms')}
                                >
                                    ← Back
                                </button>
                                <button type='submit' className='btn btn-primary'
                                        onClick={() => navigate('/admin?tab=gyms')}>
                                    {id ? 'Update' : 'Create'} Gym
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGym
