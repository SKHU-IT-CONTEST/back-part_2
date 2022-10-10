# back-part_1 202214043 윤준석 junseok0304
LMS notice crawl API by nodejs
---
## server : Oracle Free Tier server , ubuntu 22.04.1 LTS (GNU/Linux 5.15.0-1018-oracle x86_64) 춘천서버
### nodejs, express, superagent, cheer-io, pm2
### crawl resource : https://lms.skhu.ac.kr/ilos/community/notice_list_form.acl
### API Address(!!Do not use for any other purpose!!): https://api3.skhuweather.kro.kr/schoolNotice 
---
< test.json >
![스크린샷 2022-09-20 오전 12 31 36](https://user-images.githubusercontent.com/83647215/191055486-f340bafa-3e0e-4d49-a503-e56f480a6630.png)
---
< 실제 API 서버에서 반환해주는 모습 >
![스크린샷 2022-10-10 오후 1 22 03](https://user-images.githubusercontent.com/83647215/194798951-0a7115c2-4e17-4ac0-9c56-e68e2ad100a4.png)
---
< 오라클 프리티어 서버 인스턴스 구동 모습 >
<img width="1429" alt="스크린샷 2022-10-10 오후 1 50 23" src="https://user-images.githubusercontent.com/83647215/194800795-dfc7f5cc-67ed-4f6f-8290-97a0d37df34d.png">
---
< 구동중인 서버 파일 구조 /var/skhu >
---
![스크린샷 2022-10-10 오후 1 52 19](https://user-images.githubusercontent.com/83647215/194800925-c86eacd1-ab9a-42c2-88f7-ef5bddfa2bb0.png)
---
< pm2로 구동중인 프로세스 >
![스크린샷 2022-10-10 오후 1 51 43](https://user-images.githubusercontent.com/83647215/194800894-f921071b-aaaf-490f-8ca3-c21704890a4b.png)


---
