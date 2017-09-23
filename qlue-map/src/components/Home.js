import React, {Component} from 'react';
import { Map, Marker, Popup, TileLayer,} from 'react-leaflet';
import L from 'leaflet';
import {connect} from 'react-redux';

import {dbGet} from '../actions'
import Background from './header_qlue_id.gif';

var qlueIcon = L.Icon.extend({
    options: {
       iconSize:     [50, 50],      
       iconAnchor:   [22, 94],       
       popupAnchor:  [-3, -76]
    }
});

var qlueMarker = new qlueIcon({
    iconUrl: 'http://www.qlue.co.id/vacancy/svc/icon-marker.png',    
})

var sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: `url(${Background})`
};

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: -6.186486, 
      lng: 106.834091,
      zoom: 12,
      isToggleOn: true,
      listData: ''
      }
    }
  
  handleClick(id) {
    return alert(id)
  }
  
  handleAllMarker(){
    if(this.state.isToggleOn === true){
      this.setState({
        isToggleOn: false
      })
    } else {
      this.setState({
        isToggleOn: true
      })
    }
  }
   
  componentWillMount(){
    this.props.allListData() 
  }
  
 render() {
    const position = [this.state.lat, this.state.lng]     
    /* const position = [this.state.lat, this.state.lng]; */
    return (
      <div>
        <div className="row">
          <div className="jumbotron" style={sectionStyle}>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <Map center={position} zoom={this.state.zoom}>
              <TileLayer
                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              
              {this.props.list.map((data,index) => {
                return(<div key={index}>
                  <Marker position={data.markers.position} icon={qlueMarker}>
                    <Popup>
                      <span>{data.markers.description}</span>
                    </Popup>
                  </Marker> 
                </div>)
              })}
            </Map>
            
            <button onClick={() => this.handleAllMarker()} className="btn btn-warning">{this.state.isToggleOn ? 'Hide' : 'Show'}</button>
            
          </div>
          <div className="row" style={{marginTop: 50}}>
            {this.props.list.map((data,index) => {
            return(<div className="col-md-4" key={index}>  
              <ul style={{listStyleType: 'none'}}>
                <li>
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                      <h3 className="panel-title">{data.kabupaten}</h3>
                    </div>
                    <div className="panel-body">
                      {data.description}
                    </div>
                    <div className="panel-footer">
                      <button onClick={() => this.handleClick(data.id)} className="btn btn-info">Hide/Show</button>
                    </div>
                    </div>
                  </li>
              </ul>
            </div>)
            })}
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    list: state.listItem
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    allListData: () => dispatch(dbGet())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)