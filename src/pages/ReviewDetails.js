import React from 'react'
import { useParams } from 'react-router-dom'
// import useFetch from '../hooks/useFetch'
import { useQuery, gql } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

const convertMarkdown = (text) => {
    return (
        <ReactMarkdown>{text}</ReactMarkdown>
    )
}

const REVIEW = gql`
    query GetEReviews($id: ID!) {
        review(id: $id) {
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


export default function ReviewDetails() {
    const { id } = useParams()
    // const { loading, error, data } = useFetch(`http://localhost:1337/api/reviews/${id}`)
    const { loading, error, data } = useQuery(REVIEW, {
        variables: { id: id }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    return (
        <div key={data.review.data.id} className="review-card">
            <div className="rating">{data.review.data.attributes.rating}</div>
            <h2>{data.review.data.attributes.title}</h2>

            <small>Console list</small>

            <div>{convertMarkdown(data.review.data.attributes.body)}</div>
        </div>
    )
}
