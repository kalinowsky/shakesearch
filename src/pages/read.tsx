import { Button } from "../components/Button"
import { Text } from "../components/SearchResult"
import { useRead } from "../hooks/useRead"
import { PageProps } from "../types"

const Read: PageProps = () => {
  const { results, goToPage, canGoToPage } = useRead()
  return (
    <div>
      {results.type === "Fetched" && (
        <>
          <Text rawText={results.value.content.join("")} />
          <div>
            <Button
              btnType="secondary"
              disabled={canGoToPage("previous")}
              onClick={goToPage("previous")}
            >
              Previous
            </Button>
            <Button btnType="secondary" disabled={canGoToPage("next")} onClick={goToPage("next")}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Read
