import { useState, useEffect, useContext } from 'react';
import { InteractionManager, ActivityIndicator } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';
import { Image } from '@rneui/themed';
import ReviewContext from '../../reviewSelectorContext';

interface Source { 
    uri: string
}

interface ContainerStyle { 
    aspectRatio: number;
    width: string;
    flex: number;
}
interface CachedProps { 
    source: Source; 
    containerStyle?: ContainerStyle; 
    style?: {}
    id: number | string; 
    navigation: any;
  
    
}
export default function CachedImage(props: CachedProps, {navigation}) { 
    let {review, setReview} = useContext(ReviewContext);


    const [imgUri, setImgUri] = useState<string>('');
    // const [mounted, setMounted] = useState<boolean>(true); 
    let mounted:boolean = true; 
    // const [downloadResumable, setDownloadResumable] = useState<FileSystem.DownloadResumable>(null)
    let downloadResumable:FileSystem.DownloadResumable = null; 
    let interaction;

    let source = imgUri ? { uri: imgUri } : null;
    if (!source && props.source) {
      source = { ...props.source };
    }
    

    async function getImageFilesystemKey(remoteURI: string) {
        // hash source url 
        const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, remoteURI);
        return `${FileSystem.documentDirectory}${hashed}`;
    }

    async function loadImage(filesystemURI:string, remoteURI:string) {
        // clear downloadresumable object from any previous downloads! 
        if (downloadResumable && downloadResumable.cancelAsync) {
          downloadResumable.cancelAsync();
        }
        try {
          // Use the cached image if it exists
          const metadata = await FileSystem.getInfoAsync(filesystemURI);
          
          if (metadata.exists) {
            
            setImgUri(filesystemURI);
            return;
          }
    
          // otherwise download to cache
          downloadResumable = FileSystem.createDownloadResumable(
            remoteURI,
            filesystemURI,
            {},
            (dp) => onDownloadUpdate(dp)
          );
            
          // get downloaded url and set state to this
          const imageObject = await downloadResumable.downloadAsync();
          console.log("Downloading......")
          if (mounted) {
            if (imageObject && imageObject.status === 200) {
              setImgUri(
                imageObject.uri,
              );
            }
          }
         
        } catch (err) {
          console.log('Image download error:', err);
          if (mounted) {
            setImgUri(null);
          }
          const metadata = await FileSystem.getInfoAsync(filesystemURI);
          if (metadata.exists) {
            await FileSystem.deleteAsync(filesystemURI);
          }
        }
    }

    function onDownloadUpdate(downloadProgress: FileSystem.DownloadProgressData) {
        // when we're done downloading, cancel the download and reset the downloadresumable object
        if (downloadProgress.totalBytesWritten >= downloadProgress.totalBytesExpectedToWrite) {
          if (downloadResumable && downloadResumable.cancelAsync) {
            downloadResumable.cancelAsync();
          }
          downloadResumable = null;
        }
      }

    async function checkClear() {
        // delete image from filesystem if we don't want it anymore! (called when component is unmounted)
        try {
          if (downloadResumable) {
            const t = await downloadResumable.pauseAsync();
            const filesystemURI = await getImageFilesystemKey(props.source.uri);
            const metadata = await FileSystem.getInfoAsync(filesystemURI);
            if (metadata.exists) {
              console.log("Deleting file...?");
              await FileSystem.deleteAsync(t.fileUri);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }








    useEffect(() => {
        // when component has been mounted, try to download the image/retrieve cached image based on the url in props
        interaction = InteractionManager.runAfterInteractions(async () => {
            if (props.source.uri) {
                const filesystemURI = await getImageFilesystemKey(props.source.uri);
                await loadImage(filesystemURI, props.source.uri);
                
            }
        }) 
    }, [])

    useEffect(() => {
        // if a source url exists and the image hasn't been loaded yet, start loading it now!
        async function checkLoaded() {
            if (props.source.uri) {
                const filesystemURI = await getImageFilesystemKey(props.source.uri);
                if (props.source.uri === imgUri || filesystemURI === imgUri) {
                return null;
                }
                await loadImage(filesystemURI, props.source.uri);
                
            }
        }

        checkLoaded(); 
      }, [imgUri]);


      useEffect(() => {
        // componentWillUnmount: do cleanup

        async function cleanup() { 
            interaction && interaction.cancel();
            mounted = false;
            await checkClear();
        }
        return () => {
            cleanup(); 
            
        }
      }, []);


      return (
        <Image 
            source={source}
            containerStyle={props.containerStyle}
            PlaceholderContent={<ActivityIndicator />}
            style={props.style}

            onPress={() => {
                console.log(imgUri);
                setReview(props.id);
                props.navigation.navigate('PostScreen');
                console.log("hello");
            }}
       />
      );

}