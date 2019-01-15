// @flow
import React, { PropTypes } from 'react';
import type { SearchResult } from '../type';
import '../style/Item.css';
var Spinner = require('react-spinkit');
import emitter from '../emitter';
var downloadjs = require("downloadjs");


class Item extends React.PureComponent<{}, ItemState> {
  state: ItemState = {
    'isDownloading': false
  };

  constructor(props: SearchResult) {
    super(props);

    this.emitDownload = () => emitter.emit('download', this.state);

    this.downloadFile = url => {
      this.setState({ isDownloading: true })

      fetch(url)
            .then((res) => res.json())
            .then(
              (res_url) => {
                let a = document.createElement('a')
                a.href = res_url["url"]
                a.download = res_url["url"].split('/').pop()
                a.click()

                this.setState({
                  isDownloading: false
                });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                console.log(error)
                this.setState({
                  isDownloading: false
                });
              }
            )
    }

    this._onClick = e => {
      let href = 'https://itunesdl.herokuapp.com/' + this.props.trackId + '?url=true';
      this.downloadFile(href);
      // this.emitDownload();
    }
  }

  render() {
    return (
      <div className="card-wrapper">
        <div className="card">
          <div className="card-image waves-effect waves-block waves-light">
            <img
              alt="img"
              className="activator"
              src={this.props.artworkUrl100.replace('100x100', '1200x1200')}
            />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">{this.props.trackName || this.props.collectionName}<i className="material-icons right">more_vert</i></span>
            <div>
              <a className="left">
                {this.props.version}
              </a>
              <span className="right download-button">
                <a className={`right ${this.state.isDownloading ? '' : 'hidden'}`}>
                  <Spinner name="chasing-dots" />
                </a>
                <a onClick={this._onClick} className={`download-link material-icons right ${this.state.isDownloading ? 'hidden' : ''}`}>
                  get_app
                </a>
              </span>
            </div>
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">{this.props.trackName || this.props.collectionName}<i className="material-icons right">close</i></span>
            <p>{this.props.longDescription || this.props.description || 'No description.'}</p>
          </div>
        </div>
      </div>
    )
  }
};

export default Item;
