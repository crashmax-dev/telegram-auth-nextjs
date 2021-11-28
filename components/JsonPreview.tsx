import React from 'react'
import formatJson from 'json-format-highlight'

export const JsonPreview: React.FC = (props) => {
  const colors = {
    keyColor: '#9cdcfe',
    nullColor: '#569cd6',
    trueColor: '#569cd6',
    falseColor: '#569cd6',
    numberColor: '#b5cea8',
    stringColor: '#ce9178'
  }

  const code = formatJson(props.children, colors)

  return (
    <pre
      className="max-w-5xl bg-gray text-white shadow-lg overflow-auto w-full rounded-md p-4"
      dangerouslySetInnerHTML={{ __html: code.replaceAll('word-wrap:break-word;', '') }}
    ></pre>
  )
}
