# vessel_track


vessel_track is a web application that receives a specific GeoJSON file, displays vessel information in a table and toggle track on map while selecting a vessel.


# Installation
```sh
$ git clone https://github.com/nara007/vessel_track.git
$ cd vessel_track
$ npm install
```

# Usage
```sh
$ cd vessel_track
$ npm start
```
When server is on, please open **http://localhost:3000/** in browser.
 - click the input:file and then select a GeoJSON file generated by **csv2json**
 - click the **load** button, then vessels will be shown in table
 - click the checkbox, the track will be shown or hidden

# Unit Test of vessel_track
```sh
$ cd vessel_track
$ npm test (Then press 'a' to run all tests)
```



