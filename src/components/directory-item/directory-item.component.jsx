import { DirectoryItemContainer, BackgroundImage, Body, DirectoryItemTitle, DirectoryItemShopNow} from "./directory-item.styles" 
import { useNavigate } from 'react-router-dom'

const DirectoryItem = ({category}) => {
    const {imageUrl, title, route} = category
    const navigate = useNavigate()
    
    const onNavigateHandler = () => navigate(route)

    return (
            <DirectoryItemContainer onClick={onNavigateHandler}>
              <BackgroundImage imageUrl={imageUrl}>
              </BackgroundImage>
              <Body to={`/shop/${title.toLowerCase()}`}>
                  <DirectoryItemTitle>{title}</DirectoryItemTitle>
                  <DirectoryItemShopNow>Shop now</DirectoryItemShopNow>
              </Body>
            </DirectoryItemContainer>
    )
}

export default DirectoryItem