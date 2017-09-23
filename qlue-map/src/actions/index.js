import axios from 'axios'

export const getData = (data) => {
  return{
    type: "GET_DATA",
    payload: {
      listData: data
    }
  }
}

export const dbGet = () => {
  return(dispatch, getState) => {
    axios.get(`https://ext.qlue.id/example/top_report`, {headers: {"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicWx1ZWluIiwiaWF0IjoxNDk0Mzk5Njg1fQ.mG5wmoCwmchufTPloxI7AjZaeM_bwcpCEJpyUnCDrmk"}})
    .then(res => {
      // console.log('==================== res data',res.data);
      var newDataFilter = []
      res.data.forEach(listData => {
        var latlng = []
        latlng.push(listData.lat)
        latlng.push(listData.lng)
        var obj = {
          key: listData.id,
          position: latlng,
          description: listData.description
        }
        // console.log(latlng);
        var newData = {...listData, markers: obj}
        newDataFilter.push(newData)
      })
      
      /* console.log('======================================new dataFilter',newDataFilter[0].markers.position); */
      /* console.log('======================================new dataFilter',newDataFilter[0].markers); */
      dispatch(getData(newDataFilter))
    })
    .catch(err => console.log(err))
  }
}