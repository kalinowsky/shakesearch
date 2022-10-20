import { Button } from "../components/Button"
import { Text } from "../components/SearchResult"
import { useRead } from "../hooks/useRead"
import { PageProps } from "../types"

const Read: PageProps = () => {
  const { results, goToPage } = useRead()
  return (
    <div>
      {results.type === "Fetched" && (
        <>
          <Text rawText={results.value.join("")} />
          <div>
            <Button btnType="secondary" onClick={goToPage("previous")}>
              Previous
            </Button>
            <Button btnType="secondary" onClick={goToPage("next")}>
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

export default Read
