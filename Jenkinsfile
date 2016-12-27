#!groovy

node ('frontend-slave') {

  withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'docker-registry-jenkins-user', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASSWORD']]) {

    stage('Build Container Image') {
      print("Starting build pipeline on branch ${env.BRANCH_NAME}")
      checkout scm
      sh '''cd bender
      npm install && npm run build
      docker login -u "$REGISTRY_USER" -p "$REGISTRY_PASSWORD" registry.rythm.co
      docker build -t registry.rythm.co/bender-front:latest . '''
    }

    if(env.BRANCH_NAME == "staging" || env.BRANCH_NAME == "master") {
      stage('Push Container Image') {
        sh 'docker push registry.rythm.co/bender-front:latest'
      }
    }

    if(env.BRANCH_NAME == 'master') {
      stage('Deploy on prod') {
        sh '/build-scripts/deploy-tested-image.sh bender prod'
      }
    }
  }
}