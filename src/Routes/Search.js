import React, { useState, useEffect } from 'react';
import { moviesApi, tvApi } from "../Services/api";
import styled from "styled-components";
import Section from "../Components/Section";
import Poster from "../Components/Poster";
import Loader from "../Components/Loader";
import Message from "../Components/Message";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-top: 20px;
  margin-bottom:20px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

function Search() {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tvResults, setTvResults] = useState([]);
  const [movieResults, setMovieResults] = useState([]);

  useEffect(async ()=>{
    
    if(searchTerm && searchTerm.length >=3){
      console.log("changed")
      searchByTerm()
    }
    
  },[searchTerm])
  
  const updateTerm = event => {
    setSearchTerm(event.target.value);
  }; 


  const searchByTerm = async () => {
    var term  = searchTerm;
    setLoading(true);
    setError(null);
    try {
      const {data: { results: movieResults }} = await moviesApi.search(searchTerm);
      const {data: { results: tvResults }} = await tvApi.search(searchTerm);
      setMovieResults(movieResults)
      setTvResults(tvResults)
    } catch {
      setError("Error While Searching !!!!");
    } finally {
      setLoading(false);
    }
  };

  return (  
    <Container>
    <Form>
      <Input
        placeholder="Search Movies or TV Shows..."
        value={searchTerm}
        onChange={updateTerm}
      />
    </Form>
    {loading ? (
      <Loader />
    ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title="Movie Results">
            {movieResults.map(movie => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.original_title}
                rating={movie.vote_average}
                isMovie={true}
              />
            ))}
          </Section>
        )}
        {tvResults && tvResults.length > 0 && (
          <Section title="TV Show Results">
            {tvResults.map(show => (
              <Poster
                key={show.id}
                id={show.id}
                imageUrl={show.poster_path}
                title={show.original_name}
                rating={show.vote_average}
                
              />
            ))}
          </Section>
        )}
        {error && <Message color="#e74c3c" text={error} />}
        {tvResults &&
          movieResults &&
          tvResults.length === 0 &&
          movieResults.length === 0 && (
            <Message text="Nothing found" color="#95a5a6" />
          )}
      </>
    )}
  </Container>
  )
}


export default Search;
