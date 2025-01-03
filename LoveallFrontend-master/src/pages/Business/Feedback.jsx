'use client'

import React, { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Star, Search, Calendar } from 'lucide-react'
import { getToken } from '../../utils/tokenManager'
import { useNavigate } from 'react-router-dom'

ChartJS.register(ArcElement, Tooltip, Legend)

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  )
}

const CustomerFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ratingFilter, setRatingFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const token = getToken('business_auth_token')
        if (!token) {
          navigate('/', { replace: true })
          throw new Error('No authentication token found')
        };

        const response = await fetch(`${process.env.REACT_APP_API_URL}/business/feedback`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch feedback data')
        }

        const data = await response.json()
        console.log('Fetched feedback data:', data)
        setFeedbacks(data.feedbacks)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching feedback:', error)
        setError(error.message)
        setLoading(false)
      }
    }

    fetchFeedbackData()
  }, [])

  // Filtering logic
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesRating =
      !ratingFilter || feedback.rating.toString().includes(ratingFilter)
    const matchesDate =
      !dateFilter ||
      new Date(feedback.created_at).toLocaleDateString().includes(dateFilter)

    return matchesRating && matchesDate
  })

  if (loading) {
    return <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center text-red-500">{error}</div>
  }

  if (feedbacks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-center">
        No feedback available at this time.
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <span className="mr-2">📋</span> Customer Feedback & Reviews
        </h1>
        <p className="text-gray-600 mb-6">View and filter customer reviews</p>

        <div className="flex mb-6 space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Filter by rating"
              className="w-full p-2 pl-10 border rounded-md"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Filter by date"
              className="w-full p-2 pl-10 border rounded-md"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            <Calendar className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        <div className="space-y-4">
          {filteredFeedbacks.map((feedback) => (
            <div key={feedback.feedback_id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold">{`${feedback.user.first_name} ${feedback.user.last_name}`}</h2>
                  <p className="text-sm text-gray-500">{feedback.store.store_name}</p>
                  <StarRating rating={feedback.rating} />
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(feedback.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{feedback.comments || 'No comments provided'}</p>
            </div>
          ))}
        </div>

        {filteredFeedbacks.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No feedbacks match the current filters.
          </div>
        )}

        {/* Commented out the pie chart section as it's not part of the dynamic data yet */}
        {/* <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Customer Spending Distribution</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <Pie data={spendingData} />
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default CustomerFeedback

