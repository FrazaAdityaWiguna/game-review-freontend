import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import ReactMarkdown from 'react-markdown'

const convertMarkdown = (text) => {
    return (
        <ReactMarkdown>{text}</ReactMarkdown>
    )
}


export default function ReviewDetails() {
    const { id } = useParams()
    const { loading, error, data } = useFetch(`http://localhost:1337/api/reviews/${id}`)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div key={data.data.id} className="review-card">
            <div className="rating">{data.data.attributes.rating}</div>
            <h2>{data.data.attributes.title}</h2>

            <small>Console list</small>

            <div>{convertMarkdown(data.data.attributes.body)}</div>
        </div>
    )
}
