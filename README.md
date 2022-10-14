# back-part_2 202014026 황재현
data.go.kr weather crawl API by nodejs
---
## server : Oracle Free Tier server , ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-1018-oracle x86_64) 춘천서버
### nodejs, express, superagent, cheer-io, pm2
### crawl resource : 공공데이터 포털 기상청 구)동네예보 API
### API Address(!!Do not use for any other purpose!!): https://api3.skhuweather.kro.kr/getWeather
---


* 날씨 크롤링 코드 제작

  * 공공 데이터 포털에서 가져온 데이터를 활용하여, js 프로그래밍을 통해 추려낸 내용을 json 파일로 저장하는 작업 진행
    <img width="433" alt="스크린샷 2022-10-14 오후 7 53 08" src="https://user-images.githubusercontent.com/72461790/195830411-53223a70-a975-4fb0-97a0-1ac8ca4c54ce.png">

* 날씨 api 서버에서 json 파일 호스팅 코드 제작

  * 포트 접속을 시도하면, 현재 시간 기준 현재시간~3시간 후의 데이터가 표현되게끔 프로그래밍 작업 진행
    <img width="431" alt="스크린샷 2022-10-14 오후 7 53 30" src="https://user-images.githubusercontent.com/72461790/195830452-31f8869d-d452-4b45-a6bd-6c7fb731ce52.png">

  
  
* 실시간 날씨 제보 기능 제작

  * 여러 사용자들이 현재 가장 유사한 상황을 제보하면, 제보 갯수가 바로 표시되며, 제보갯수의 최대값에 해당하는 이미지가 메인 페이지에 나타나도록 구현 진행
  
    <img width="434" alt="스크린샷 2022-10-14 오후 7 53 43" src="https://user-images.githubusercontent.com/72461790/195830547-74011937-0901-47fd-b698-b6b61b55dd4a.png">



![스크린샷 2022-10-10 오후 2 28 45](https://user-images.githubusercontent.com/83647215/194803592-600bd1e0-ecd9-4111-b740-c3f2251b0256.png)
