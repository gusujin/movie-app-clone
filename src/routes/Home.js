import React from 'react'
import axios from 'axios'
import Movie from '../components/Movie'
import './Home.css';

class Home extends React.Component{
    state = {
        isLoading: true,
        // movie: [],
      };
      getMovies = async () => {
        const {
          data: {
            data: { movies },
          },
        } = await axios.get(
          "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
          );
        //api에 있는 데이터를 받아오는 것
        this.setState({ movies: movies, isLoading: false });
      };
      //async 와 await은 동시에 사용해야 한다.
      componentDidMount() {
        this.getMovies();
      }
      render() {
        const { isLoading, movies } = this.state;
        return (
          <section className="container">
            {isLoading ? (
              <div className="loader">
                <span className="loader_text">'Loading...'</span>{" "}
              </div>
            ) : (
                <div className="movies">
                { movies.map((movie) => (
                  <Movie
                    key={movie.id}
                    id={movie.id}
                    year={movie.year}
                    title={movie.title}
                    summary={movie.summary}
                    poster={movie.medium_cover_image}
                    genres={movie.genres}
                  />
            ))}
            </div>
            )}
          </section>
        );
      }
}

export default Home;