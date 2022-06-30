import React, { Component } from 'react'

export default class newsItem extends Component {

 

  render() {
    let { title, description, imageUrl, newsUrl, author, date, source, category } = this.props;

     

     let badgeColor = (category)=>{
          switch(category)
          {
             case "general": return "grey";
             case "business": return "black";
             case "entertainment": return "purple";
             case "health": return "green";
             case "science": return "#22A37C";
             case "sports": return "purple";
             case "technology": return "#22A37C";
             default: return "red";

          }
     }

    return (

      <div>
        
        <div className="card my-2 mx-2">
          <img src={imageUrl} className="card-img-top" alt="..."/>
            

          <div className="card-body">

            <h5 className="card-title">{title} 
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill" style={{backgroundColor:badgeColor(category)}}>
              {source}
            </span>
         
             </h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">  {author?"By "+author:""}  |  {new Date(date).toGMTString()}</small></p>
            <a  rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>

      </div>
    )
  }
}
