declare module 'json-format-highlight' {
  interface Colors {
    keyColor?: string
    nullColor?: string
    trueColor?: string
    falseColor?: string
    numberColor?: string
    stringColor?: string
  }

  function format(json: any, colors?: Colors): string
  export default format
}
