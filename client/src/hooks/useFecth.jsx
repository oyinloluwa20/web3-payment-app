import { useEffect,useState } from "react";

const API_KEY =import.meta.env.REACT_APP_GIPHY_API

const useFetch =({keyword})=>{
    const [gifUrl, setGifUrl] = useState("");

    const FetchGifs= async()=>{
        try {
            const response =await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&${keyword.split("").join("")}&limit=1`)
            const {data} =await response.json()

            setGifUrl(data[0]?.images?.downsized_medium?.url)
        } catch (error) {
            setGifUrl=''
        }
    }
    useEffect(()=>{
        if(keyword) FetchGifs();
    },[keyword]);
    
    return gifUrl
}

export default useFetch;
