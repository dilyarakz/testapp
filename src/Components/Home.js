import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Input,
  Container,
  Flex,

  Spacer,
  Box,
  HStack,
  Wrap,
  WrapItem,
  Center,
  VStack
} from '@chakra-ui/react'
import { getMovies, searchMovies, getGenres } from '../Actions/MoviesServer';
import { connect, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import MovieItemCard from './MovieItemCard';
import store from '../store'
import ReactPaginate from 'react-paginate';
import { SearchIcon, ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom";


const propTypes = {};

const defaultProps = {};

const PER_PAGE = 5;

const Home = (props) => {

  const [movieData, setMovies] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');

  const [allGenres, setAllGenres] = useState({})

  const genreNames = []

  useEffect(() => {
    props.getMovies().then(m => setMovies(m))
    props.getGenres().then(g => setAllGenres(g))
  }, [])

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const offset = currentPage * PER_PAGE;

  function handleInput() {
    if (searchQuery.length > 1) {
      props.searchMovies(searchQuery)
        .then(m => setMovies(m))
    }
    setSearchQuery('');
  }

  function getGenreNames(allGenres, res) {
    const gNames = []
    if (allGenres.hasOwnProperty('genres')) {
      console.log("has property")
      allGenres.genres.map(genre => {
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

  const pageCount = Math.ceil(movieData.length / PER_PAGE);

  return (
    <>
      <Box bg="#747474" p='10'>
        <Flex p='10' align='center' justifyContent='center' alignItems='center'>
          <Input
            id="searchInput"
            width='70%'
            bg='white'
            placeholder='Search for movie here'
            onChange={e => setSearchQuery(e.target.value)}
            value={searchQuery}
          /><Button
            bg='#FFE400'
            onClick={() => handleInput()}
          ><SearchIcon /></Button>
        </Flex>
      </Box>

      <Container p={20} maxW='container.x1' >

        <Flex style={{ overflowY: "hidden", hight: "70%" }}>
          {
            movieData.slice(offset, offset + PER_PAGE)
              .map((res, index) => {
                if (typeof res !== 'undefined') {

                  return (
                    <WrapItem key={res.id}>
                      <Center key={res.id}>
                        <MovieItemCard key={res.id} movie={res} width={400} height={700} genre={getGenreNames(allGenres, res)} />
                      </Center>
                    </WrapItem>
                  )
                }
              })
          }
        </Flex>
        <Box p={10} className="pagination-container">
          <ReactPaginate
            previousLabel={<ArrowLeftIcon />}
            nextLabel={<ArrowRightIcon />}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </Box>



      </Container>



    </>
  );
}

Home.propTypes = {
  // movie: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
  searchMovies: PropTypes.func.isRequired,
  getGenres: PropTypes.func.isRequired,
}
Home.defaultProps = defaultProps;
// #endregion


export default connect(
  null,
  { getMovies, searchMovies, getGenres }
)(Home);