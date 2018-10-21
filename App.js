/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Dimensions} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Polyline from '@mapbox/polyline';

type Props = {};
export default class App extends Component<Props> {
  
  constructor(Props){
    super(Props);
    this.state={
      coords: []
    }
  }

  componentDidMount(){
    this.getDirections("43.772, 11.254", "43.770,11.256")
  }

  async getDirections(startLoc, destinationLoc){
    try {
      
      let resp=await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=AIzaSyA4zaZ9YUl2MVu7TZCtkdt8LzyEmvoswB4`)
      let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index)=>{
              return{
                latitude:point[0],
                longitude:point[1]
              }
            })
            this.setState({coords: coords})
            return coords

    } catch (error) {
        alert(error)
    }
  }

  render() {
    return (
      <View>
        <MapView style={styles.map} initialRegion={{
          latitude:43.772, 
          longitude:11.254, 
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        provider={PROVIDER_GOOGLE}>

        <MapView.Polyline 
            coordinates={this.state.coords}
            strokeWidth={2}
            strokeColor="red"/>

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

});
