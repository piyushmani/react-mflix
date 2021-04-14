import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Loader from "../Components/Loader";
import { moviesApi, tvApi } from "../Services/api";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 20px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

function Details(pathname) {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);


  useEffect(async ()=>{
      const { match: {params: { id }},history: { push }} = pathname;
      var isMovie =  pathname.location.pathname.includes("/movie/")
      const parsedId = parseInt(id);
      try {
        if (isMovie) {
        const  detailResult = await moviesApi.movieDetail(parsedId);
        setResult(detailResult.data)
       } else {
        const  detailResult = await tvApi.showDetail(parsedId);
        setResult(detailResult.data)
      }
      
    } catch {
      setError("Can't find anything.");
    } finally {
      setLoading(false);
    }
  },[])

  return (  
    <>

    {loading ? (
      <Loader />
    ) : (
      <Container>

      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={`https://image.tmdb.org/t/p/original${result.poster_path}`
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}
          </Title>
          <ItemContainer>
            
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
        </Data>
      </Content>
    </Container>
    )}
  </>
  )
}


export default Details;
