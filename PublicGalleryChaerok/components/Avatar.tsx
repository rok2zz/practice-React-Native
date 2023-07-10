import { Image } from "react-native";

interface Props {
    source: any,
    size: number,
    style: any
}

function Avatar({ source, size, style}: Props): JSX.Element {

    return (
        <Image style={[ style, { width: size, height: size, borderRadius: size / 2}]} 
            source={ source || require('../assets/imgs/user.png') } resizeMode="cover" />
    )
}

Avatar.defaultProps = {
    size: 32
}

export default Avatar