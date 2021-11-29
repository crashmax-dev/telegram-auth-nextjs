import React from 'react'
import formatJson from '@crashmax/json-format-highlight'

const JsonPreview: React.FC = (props) => {
  const __html = formatJson(props.children)

  return (
    <pre
      className="max-w-5xl bg-gray text-white shadow-lg overflow-auto w-full rounded-md p-4"
      dangerouslySetInnerHTML={{ __html }}
    ></pre>
  )
}

export default JsonPreview
