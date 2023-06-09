import { locationCodeKeyMap } from "./keycodemap.js";

const sunBtn = document.querySelector(".sun");
const weathernBtn = document.querySelector(".weather");

sunBtn.addEventListener("click", getSun);
weathernBtn.addEventListener("click", getWeather);

// 取得紫外線API
function getSun() {
  axios
    .get(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0005-001?Authorization=CWB-587B2B59-C202-4200-A9FC-92F18F99CF28"
    )
    .then(function (response) {
      // 成功會回傳的內容
      // console.log(response.data.result.fields);
      // console.log(response.data.records.weatherElement.location);
      // console.log(response.data.records.weatherElement.elementName);
      let city = document.querySelector(".city");
      city.textContent = "觀測站";
      let location = response.data.records.weatherElement.location;
      let value = response.data.records.weatherElement.location.value;
      const title = document.querySelector(".title");
      const list = document.querySelector(".list");
      title.textContent = response.data.records.weatherElement.elementName;
      let str = "";
      for (const item of location) {
        //   console.log(item);
        let content = `
        <tr>
          <td>${locationCodeKeyMap[item.locationCode]}</td>
          <td>${item.value}</td>
        </tr>`;
        str += content;
      }
      //   console.log(str);
      list.innerHTML = str;
    })
    .catch(function (error) {
      // 失敗會回傳的內容
      console.log(error);
    });
}

// 取得天氣狀況API
function getWeather() {
  axios
    .get(
      "https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-587B2B59-C202-4200-A9FC-92F18F99CF28&locationName="
    )
    .then(function (response) {
      // 成功會回傳的內容
      // console.log(response.data.records.location);
      let city = document.querySelector(".city");
      city.textContent = "縣市";
      let data = response.data.records.location;
      // let value = response.data.records.location.value;
      const title = document.querySelector(".title");
      title.textContent = "未來6小時天氣狀態";
      const list = document.querySelector(".list");
      let str = "";
      for (const item1 of data) {
        console.log(item1.weatherElement[0].time[0].parameter.parameterName);
        let content = `
        <tr>
          <td>${item1.locationName}</td>
          <td>${item1.weatherElement[0].time[0].parameter.parameterName}</td>
        </tr>`;
        str += content;
      }
      list.innerHTML = str;
    })
    .catch(function (error) {
      // 失敗會回傳的內容
      console.log(error);
    });
}
