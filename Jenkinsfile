#!groovy

node ('frontend-slave') {

  withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'docker-registry-jenkins-user', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASSWORD']]) {

    container('slave') {

      stage('Build Container Image') {
        print("Starting build pipeline on branch ${env.BRANCH_NAME}")
        checkout scm
        sh """
          cd bender
          npm install
          npm run build
          docker login -u "${env.REGISTRY_USER}" -p "${env.REGISTRY_PASSWORD}" registry.rythm.co
          docker build -t registry.rythm.co/bender-front:\$(git rev-parse --verify --short HEAD) .
        """
      }

      if(env.BRANCH_NAME == "staging" || env.BRANCH_NAME == "master") {
        stage('Push Container Image') {
          sh 'docker push registry.rythm.co/bender-front:$(git rev-parse --verify --short HEAD)'
        }
      }

      if(env.BRANCH_NAME == 'master') {
        stage('Deploy on prod') {
          sh "/build-scripts/deploy_image.py -n prod -d bender-front bender-front=registry.rythm.co/bender-front:\$(git rev-parse --verify --short HEAD)"

          sh '/build-scripts/bump-stable-tag.sh bender-front latest'
        }
      }
    }
  }
}
