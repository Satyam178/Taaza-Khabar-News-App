import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export default class news extends Component {

  static defaultProps = {
    name: 'in',
    pageSize: 8,
    category: "science",
    country: 'in'
  }

  static propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor(props) {
    super(props);
    // console.log("Hello I am a constructor from news component");
    this.state =
    {
      articles: [],
      loading: false,
      page: 1,


    }

    document.title = `${this.props.category}-Taaza Khabar`
  }

  //First API call after page rendering
  async componentDidMount() {

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6a8beafbde234aab9ef4d0e2625eabe1&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.setState({ loading: true });
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalArticles,
      loading: false,
    });
    // console.log(publishedAt);

  }

  //Pagination
  pageChange = async (nextOrPrev) => {

    // console.log(this.state.page);

    let pageNum;

    if (nextOrPrev === "next") pageNum = this.state.page + 1
    else pageNum = this.state.page - 1;

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6a8beafbde234aab9ef4d0e2625eabe1&page=${pageNum}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    // console.log(parsedData);





    this.setState(
      {
        articles: parsedData.articles,
        page: nextOrPrev === "next" ? this.state.page + 1 : this.state.page - 1,
        totalResults: parsedData.totalResults,
        loading: false
      });


  }

  render() {
    return (
      <div className='container my-4'>


        <h2 style={{ margin: "40px 0px" }} className='text-center'>Taaza Khabar - Top HEADLINES</h2>
        {this.state.loading && <Spinner />}

        {!this.state.loading && <div className="row">
          {
            this.state.articles.map((element) => {

              return <div className="col-md-4" key={element.url}>

                <NewsItem category={this.props.category} source={element.source.name} author={element.author} date={element.publishedAt} title={element.title} description={element.description !== null ? element.description.slice(0, 100) : ""} imageUrl={element.urlToImage ? element.urlToImage : "https://play-lh.googleusercontent.com/_bHdu7hN3Pl0iT7Qh6jHab-MR2CDN5yY8TJRtv1cM_t3zZGtVfsPTgjYsB5B2MqBY7A"} newsUrl={element.url} />

              </div>
            })
          }
        </div>}


        <div className="text-center">
          <button disabled={this.state.page <= 1} type="button" onClick={() => this.pageChange("previous")} className="btn btn-primary btn-lg btn-block mx-2 my-4">&larr; Previous</button>

          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={() => this.pageChange("next")} className="btn btn-primary btn-lg btn-block my-4">Next &rarr;</button>

        </div>








      </div>
    )
  }
}
