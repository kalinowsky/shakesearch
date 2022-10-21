import Image from "next/image"
import styled from "styled-components"
import { F0 } from "../types"

export const Chevron: React.FC<{ direction: "left" | "right"; onClick: F0; disabled?: boolean }> = (
  props
) => {
  return (
    <ChevronWrapper onClick={props.onClick} disabled={props.disabled}>
      <Image
        src={props.direction === "right" ? "/chevron-right.svg" : "/chevron-left.svg"}
        alt="Chevron"
        width={164}
        height={164}
      />
    </ChevronWrapper>
  )
}

const ChevronWrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  visibility: ${(props) => (props.disabled ? "hidden" : "visible")};
  user-select: none;
`
