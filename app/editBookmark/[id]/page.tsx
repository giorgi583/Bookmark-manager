import React from 'react'

const EditBookmarkPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>bookmark id: {id}</div>
  )
}

export default EditBookmarkPage