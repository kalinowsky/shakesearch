import styled from "styled-components"

export const Text: React.FC<{ rawText: string; title?: boolean; center?: boolean }> = (props) => {
  return (
    <TextContent
      markTitle={props.title}
      center={props.center}
      dangerouslySetInnerHTML={{
        __html: props.rawText.replace(new RegExp("\r", "g"), "<br />"),
      }}
    />
  )
}

const TextContent = styled.div<{ markTitle?: boolean; center?: boolean }>`
  width: 400px;
  font-family: "Lora";
  font-size: 17px;

  @media only screen and (max-width: 480px) {
    width: 300px;
  }

  ${(props) =>
    props.center
      ? "display: flex; justify-content: center; margin-top: 32px; font-size: 16px;"
      : ""}

  ${(props) =>
    props.markTitle
      ? `
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 480px) {
    width: 300px;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  `
      : ""}
`
