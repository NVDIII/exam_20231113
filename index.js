let express = require("express");
let axios = require("axios");

let app = express();
let port = process.env.PORT || 8080;

app.use(express.static("public_html"));

// http://opendata.kwater.or.kr/openapi-data/service/pubd/waterinfos/waterquality/watersgcl/codelist?serviceKey=4VqI9ZKwHNgkrVIUOE6VYc9TVkWzrVvSwD6tMDQczav7OPJsFAcG6y9wrE1fcsG6cMsYWj7FQgryDYB%2BhVb23w%3D%3D&_type=json

app.get("/waterline", (req, res) => {
    let response = null;
    try {
        let api = async() => {
            response = await axios.get("http://opendata.kwater.or.kr/openapi-data/service/pubd/waterinfos/waterquality/watersgcl/codelist", {
                params: {
                    "servicekey" : "4VqI9ZKwHNgkrVIUOE6VYc9TVkWzrVvSwD6tMDQczav7OPJsFAcG6y9wrE1fcsG6cMsYWj7FQgryDYB%2BhVb23w%3D%3D",
                    "_type" : "json"
                }
            })
        }
        api().then((response) => {
            res.setHeader("Access-Control-Allow-Origin", "*");  
            res.json(response.data.response.body);
        })
    }
    catch(e) {
        console.log(e);
    }
    return response;
});

// 공공데이터포털 OpenAPI 엔드포인트 및 키
const apiUrl = 'http://apis.data.go.kr/B551172/Lung06';
const apiKey = '4VqI9ZKwHNgkrVIUOE6VYc9TVkWzrVvSwD6tMDQczav7OPJsFAcG6y9wrE1fcsG6cMsYWj7FQgryDYB%2BhVb23w%3D%3D';

app.get('https://apis.data.go.kr/B551172/Lung06/luPastSmokeByType?serviceKey=4VqI9ZKwHNgkrVIUOE6VYc9TVkWzrVvSwD6tMDQczav7OPJsFAcG6y9wrE1fcsG6cMsYWj7FQgryDYB%2BhVb23w%3D%3D&pageNo=1&numOfRows=10&centerNm=%EA%B5%AD%EB%A6%BD%EC%95%94%EC%84%BC%ED%84%B0&fromYear=2010&toYear=2019&type=xml', async (req, res) => {
  try {
    // OpenAPI에서 데이터 가져오기
    const response = await axios.get(apiUrl, {
      params: {
        serviceKey: apiKey,
        // 다른 필요한 매개변수 추가
      },
    });

    // 가져온 데이터 클라이언트에게 전송
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from OpenAPI:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
