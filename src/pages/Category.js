import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

const CATEGORY = gql`
    query GetCategory($id: ID!) {
        category(id: $id) {
            data {
                id,
                attributes {
                    name,
                    reviews {
                        data {
                            id,
                            attributes {
                                title, 
                                body, 
                                rating,
                                categories {
                                    data {
                                        id,
                                        attributes {
                                            name
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`

export default function Category() {
    const { id } = useParams()
    const { loading, error, data } = useQuery(CATEGORY, {
        variables: { id: id }
    })
    const GetValue = data?.category?.data?.attributes?.reviews?.data

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

    console.log(GetValue)

    if (GetValue.length <= 0) return <p>Tidak ada data :(</p>

    return (
        <div>
            {GetValue.length > 1 ?

                GetValue.map(review => (
                    <div key={review.id} className="review-card">
                        <div className="rating">{review.attributes.rating}</div>
                        <h2>{review.attributes.title}</h2>

                        <small>Console list</small>

                        <div>{convertMarkdown(review.attributes.body)}</div>
                        <Link to={`/details/${review.id}`}>Read more</Link>
                    </div>
                ))

                :

                <div key={GetValue[0].id} className="review-card">
                    <div className="rating">{GetValue[0].attributes.rating}</div>
                    <h2>{GetValue[0].attributes.title}</h2>

                    <small>

                        {GetValue.attributes.categories.data.length > 1 ?
                            GetValue.attributes.categories.data.map(category => (

                        ))
                            :
                            <>
                            </>
                        }

                    </small>

                    <div>{convertMarkdown(GetValue[0].attributes.body)}</div>
                    <Link to={`/details/${GetValue[0].id}`}>Read more</Link>
                </div>
            }
        </div>
    )
}
