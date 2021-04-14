import React, { useState, useEffect } from 'react';
import { tvApi } from "../Services/api";
import styled from "styled-components";
import Section from "../Components/Section";
import Poster from "../Components/Poster";
import Loader from "../Components/Loader";

const Container = styled.div`
  padding: 25px;
  margin-top:15px;
`;  

function TV() {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [airingToday, setAiringToday] = useState([]);

  useEffect(async ()=>{
    const {data: { results: topRated }} = await tvApi.topRated();
    const {data: { results: popular }} = await tvApi.popular();
    const {data: { results: airingToday }} = await tvApi.airingToday();
    setTopRated(topRated);
    setPopular(popular);
    setAiringToday(airingToday);
    setLoading(false);
  },[])

  return (  
    <>

    {loading ? (
      <Loader />
    ) : (
      <Container>
        {topRated && topRated.length > 0 && (
          <Section title="Top Rated Shows">
            {topRated.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.original_name}
                rating={show.vote_average}
                year={show.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular Shows">
            {popular.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.original_name}
                rating={show.vote_average}
                year={show.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
        {airingToday && airingToday.length > 0 && (
          <Section title="Airing Today">
            {airingToday.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.original_name}
                rating={show.vote_average}
                year={show.first_air_date.substring(0, 4)}
              />
            ))}
          </Section>
        )}
      </Container>
    )}
  </>
  )
}


export default TV;
