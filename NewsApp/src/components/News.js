import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spiner from './Spiner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: "in" ,
    pageSize: 8
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }
  // it willl run after render
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country }&category=${this.props.category}&apikey=765ec378bb5a4a32a60fcb1a004778f0&page=1 &pagesize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
    let pardesdata = await data.json();
    this.setState({ articles: pardesdata.articles , totalResults : pardesdata.totalResults , loading:false})
  }

  handelpreviclick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country }&category=${this.props.category}&apikey=765ec378bb5a4a32a60fcb1a004778f0&page=${this.state.page - 1} &pagesize=${this.props.pageSize}`;
   this.setState({loading:true})
    let data = await fetch(url); 
    let pardesdata = await data.json();
    this.setState({ page:this.state.page-1,articles: pardesdata.articles, loading:false })
  }

  handelnextclick= async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country }&category=${this.props.category}&apikey=765ec378bb5a4a32a60fcb1a004778f0&page=${this.state.page + 1} &pagesize=${this.props.pageSize}`;
    this.setState({loading : true})
    let data = await fetch(url);
    let pardesdata = await data.json();
    this.setState({page: this.state.page + 1, articles: pardesdata.articles , loading: false}) 
  }

  render() {
    return (
      <div className="container my-3">         {/*Margin  */}
        <h1 className='text-center' style={{margin: '40px' }}>NewsMonkey - Top Headlines</h1>
        { this.state.loading && <Spiner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} 
              newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />  </div>
          })}
        </div>
         <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type='button' className="btn btn-dark" onClick={this.handelpreviclick}>&larr; Previous</button>
          <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className="btn btn-dark" onClick={this.handelnextclick}>Next &rarr;</button>
         </div>
      </div>
    )
  } 
}

export default News
