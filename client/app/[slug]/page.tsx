"use client"
import React, { useEffect, useState } from "react"
import axios from "axios"

function Page({ params: { slug } }: { params: { slug: string } }) {
  const [data, setData] = useState<{ title: string; body: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVICE_API}/${slug}`
      )
      setData(response.data)
      console.log(response.data)
    } catch (err: any) {
      setError(err.response ? err.response.data : err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data found</div>

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  )
}

export default Page
