
import * as FileSystem from 'expo-file-system';
import * as Crypto from 'expo-crypto';


export default async function getLink(remoteURI: string) { 
    const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, remoteURI);
    const filesystemURI =  `${FileSystem.documentDirectory}${hashed}`;
    
    const metadata = await FileSystem.getInfoAsync(filesystemURI);
          
    if (metadata.exists) { 
            console.log("Link determined: " + filesystemURI)
   
            return(filesystemURI);        
    }
    console.log("Link determined: " + remoteURI);

    return(remoteURI); 
}