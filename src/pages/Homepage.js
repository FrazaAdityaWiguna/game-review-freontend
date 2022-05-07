import React from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import ReactMarkdown from 'react-markdown'

export default function Homepage() {
    const { loading, error, data } = useFetch("http://localhost:1337/api/reviews")

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    const convertMarkdown = (text) => {
        let netralText = text.replace("**", "")
        netralText = `${netralText.substring(0, 200)}...`

        return (
            <>
                <ReactMarkdown>{netralText}</ReactMarkdown>
            </>
        )
    }

    return (
        <div>
            {data.data && data.data.map(review => (
                <div key={review.id} className="review-card">
                    <div className="rating">{review.attributes.rating}</div>
                    <h2>{review.attributes.title}</h2>

                    <small>Console list</small>

                    <div>{convertMarkdown(review.attributes.body)}</div>
                    <Link to={`/details/${review.id}`}>Read more</Link>
                </div>
            ))}
        </div>
    )
}
