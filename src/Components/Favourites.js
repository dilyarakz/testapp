import React from 'react';
import PropTypes from 'prop-types';
import { StarIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getMovie, getRecom, addFav, removeFav } from '../Actions/MoviesServer';
import {
  Button,
  Input,
  Container,
  Flex,
  Box,
  Spacer,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  Center,
  Text,
  Image,
  Heading
} from '@chakra-ui/react'
import MovieItemCard from './MovieItemCard';


const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const Favourites = () => {
  let isFav = false;
  const favourites = useSelector(state => state.fmovies)
  const allGenres = useSelector(state => state.genres)
  console.log(allGenres)

  function getGenreNames(allGenres, res) {
    const gNames = []
    if (allGenres.hasOwnProperty('genres')) {
      console.log("has property")
      allGenres.genres.genres.map(genre => {
        if (res.hasOwnProperty("genre_ids")) {
          res.genre_ids.map(id => {
            if (Number(id) === Number(genre.id)) {
              console.log("Found match" + gNames.indexOf(genre.name))

              if (gNames.indexOf(genre.name) == -1) {
                console.log(genre)
                gNames.push(genre)
              }

            }
          })
        }
      })
    }
    return gNames;
  }

  return (
    <Container maxW='container.x1'>
      <Flex justifyContent='center' alignItems='center'>
        <Wrap p={10} spacing={8}>
          {
            favourites.fmovies.map((res, index) => {
              if (typeof res !== 'undefined') {
                return (
                  <WrapItem key={res.id}>
                    <Center key={res.id}>
                      <MovieItemCard key={res.id} movie={res} width={300} genre={getGenreNames(allGenres, res)} />
                    </Center>
                  </WrapItem>
                )
              }
            })
          }
        </Wrap>
      </Flex>
    </Container>

  );
}

Favourites.propTypes = propTypes;
Favourites.defaultProps = defaultProps;
// #endregion

export default Favourites;