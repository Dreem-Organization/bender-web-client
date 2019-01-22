#!groovy

node ('frontend-slave') {

  withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'docker-registry-jenkins-user', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASSWORD']]) {
    container('slave') {
      stage('Build Container Image') {
        print("Starting build pipeline on branch ${env.BRANCH_NAME}")
        checkout scm
        sh '''
        docker login -u "$REGISTRY_USER" -p "$REGISTRY_PASSWORD" registry.rythm.co
        docker login -u "$REGISTRY_USER" -p "$REGISTRY_PASSWORD" registry-internal.rythm.co
        docker build -t registry-internal.rythm.co/bender-front:$(git rev-parse --verify --short HEAD) . '''
      }

      if(env.BRANCH_NAME == "staging" || env.BRANCH_NAME == "master") {
        stage('Push Container Image') {
          sh 'docker push registry-internal.rythm.co/bender-front:$(git rev-parse --verify --short HEAD)'
        }
      }

      if(env.BRANCH_NAME == 'master') {
        stage('Deploy on prod') {
          sh '/build-scripts/deploy_image.py -n prod -d bender-front bender-front=registry-internal.rythm.co/bender-front:$(git rev-parse --verify --short HEAD)'
        }

        stage('Bump "latest" tag in Docker registry') {
          sh '/build-scripts/bump-stable-tag.sh bender-front latest'
        }
      }
    }
  }
}
