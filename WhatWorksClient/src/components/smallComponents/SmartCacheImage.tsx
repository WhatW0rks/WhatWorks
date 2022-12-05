import {useEffect, memo} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Image } from '@rneui/themed';
import { actions as ImageCacheAction } from '../../redux/ImageCacheReducer/image-cache';
import { RootState } from '../../store'; 
import { ActivityIndicator, GestureResponderEvent} from 'react-native';
interface ImageSource { 
    uri: string; 
    filename: string;
}
// interface Action { 
//     fetch: Function;
// }
interface ImageProps { 
    localUri?: string | null; 
    source: ImageSource; 
    // imageCacheAction: Action;
    style: {}
    onPress: (event: GestureResponderEvent) => void

}
 function SmartImage(props:ImageProps) {
    
    useEffect(() =>{
        ImageCacheAction['fetch'](this.props.source);
      },[])

    function getSource() {
        // handle source uri 
        if (!props.localUri) return require('../../assets/icon.png');
        return { uri: props.localUri };
    }


    return (
        <Image
        {...props}
        source={getSource()}
        PlaceholderContent={<ActivityIndicator />}
        onPress={props.onPress}
                
        />
    )

}

//export memo(SmartImage); 

export default connect(
    (state: RootState , props: ImageProps) => {
      const images = state.images;
      const loading = images['loading']
      const loaded = images['loaded']
      return {
        loading: loading.includes(props.source.uri),
        localUri: loaded[props.source.uri],
      };
    },
    (dispatch) => ({
      imageCacheAction: bindActionCreators(ImageCacheAction, dispatch)
    }),
  )(memo(SmartImage));