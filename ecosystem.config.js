//코드4. 설정파일 ecosystem.config.js
//ecosystem.config.js
module.exports = {
    apps: [{
    name: 'app',
    script: 'back-part_2/index.js',
    instances: 0,
    exec_mode: 'cluster'
    }]
  }