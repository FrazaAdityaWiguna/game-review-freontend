import React from 'react'
import { Link } from 'react-router-dom'
// import useFetch from '../hooks/useFetch'
import ReactMarkdown from 'react-markdown'
import { useQuery, gql } from '@apollo/client'

const REVIEWS = gql`
    query GetEReviews {
        reviews {
            data {
                id
                attributes {
                    title
                    rating
                    body
                }
            }
        }
    }
`

export default function Homepage() {
    // const { loading, error, data } = useFetch("http://localhost:1337/api/reviews")
    const { loading, error, data } = useQuery(REVIEWS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    const convertMarkdown = (text) => {
        // console.log(text.includes("**"));
        // let netralText = text.replace("**", "")
        let netralText = `${text.substring(0, 200)}...`

        return (
            <>
                <ReactMarkdown>{netralText}</ReactMarkdown>
            </>
        )
    }

    return (
        <div>
            {data.reviews.data && data.reviews.data.map(review => (
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
