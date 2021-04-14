import React, { useState, useEffect } from 'react';
import { moviesApi } from "../Services/api";
import styled from "styled-components";
import Section from "../Components/Section";
import Poster from "../Components/Poster";
import Loader from "../Components/Loader";

const Container = styled.div`
  padding: 25px;
  margin-top:15px;
`; 

function Home() {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nowPlaying, setnowPlaying] = useState([]);
  const [upComing, setupComing] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(async ()=>{
    const {data: { results: nowPlaying }} = await moviesApi.nowPlaying();
    const {data: { results: upComing }} = await moviesApi.upcoming();
    const {data: { results: popular }} = await moviesApi.popular();
    setnowPlaying(nowPlaying);
    setupComing(upComing);
    setPopular(popular);
    setLoading(false);
  },[])

  return (  
    <>

    {loading ? (
      <Loader />
    ) : (
      <Container>
        {nowPlaying && nowPlaying.length > 0 && (
          <Section title="Now Playing">
            {nowPlaying.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular">
            {popular.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {upComing && upComing.length > 0 && (
          <Section title="Up Coming">
            {upComing.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}
      </Container>
    )}
  </>
  )
}


export default Home;
