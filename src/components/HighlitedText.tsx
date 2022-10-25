import * as _ from "lodash"
import styled from "styled-components"

export const HighlightedText = ({ text = "", highlight = "" }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, "gi")
  const parts = text.split(regex)
  return (
    <div>
      {parts
        .filter((part) => part)
        .map((part, i) =>
          regex.test(part) ? <Highlight key={i}>{part}</Highlight> : <span key={i}>{part}</span>
        )}
    </div>
  )
}

const Highlight = styled.span`
  color: ${(props) => props.theme.colors.primary};
  font-weight: bold;
  font-family: "Lora";
`
