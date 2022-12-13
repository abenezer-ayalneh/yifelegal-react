import {useParams} from "react-router-dom";

type DispatcherPageParams = {
    pageName: string,
}
const PageDispatcher = ():JSX.Element => {
    const {pageName} = useParams<DispatcherPageParams>()

    const chosenPage = (): JSX.Element => {
        switch (pageName) {
            case "apartment":
                return <div>Apartment Questions</div>
            default:
                return <div>Page coming soon...</div>
        }
    }
    return chosenPage()
}

export default PageDispatcher;