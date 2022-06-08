import { DirectoryItemContainer, BackgroundImage, Body, DirectoryItemTitle, DirectoryItemShopNow} from "./directory-item.styles" 


const DirectoryItem = ({category}) => {
    const {imageUrl, title} = category
    return (
            <DirectoryItemContainer>
              <BackgroundImage style={{
                backgroundImage: `url(${imageUrl})`
              }}>
              </BackgroundImage>
              <Body>
                  <DirectoryItemTitle>{title}</DirectoryItemTitle>
                  <DirectoryItemShopNow>Shop now</DirectoryItemShopNow>
              </Body>
            </DirectoryItemContainer>
    )
}

export default DirectoryItem