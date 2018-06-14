#!groovy

def shortCommitHash = null
def imageTag = null
def projectName = "bender-front"
def dockerRegistry = env.GLOBAL_VAR_DOCKER_REGISTRY

node ('frontend-slave') {
  withEnv(["DOCKER_REGISTRY=${dockerRegistry}"]) {
    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'docker-registry-jenkins-user', usernameVariable: 'REGISTRY_USER', passwordVariable: 'REGISTRY_PASSWORD']]) {

      container('slave') {

        stage('Build Container Image') {
          print("Starting build pipeline on branch ${env.BRANCH_NAME}")
          checkout scm

            shortCommitHash = sh([script: "git rev-parse --verify --short HEAD", returnStdout: true]).trim()
            env.SHORT_COMMIT_HASH=shortCommitHash
            imageTag = "${env.DOCKER_REGISTRY}/${projectName}:${shortCommitHash}"

          sh """
            cd bender
            npm install
            npm run build
            docker login -u "${env.REGISTRY_USER}" -p "${env.REGISTRY_PASSWORD}" ${dockerRegistry}
            docker build -t ${imageTag} .
          """
        }

        if(env.BRANCH_NAME == "staging" || env.BRANCH_NAME == "master") {
          stage('Push Container Image') {
            sh 'docker push ${imageTag}'
          }
        }

        if(env.BRANCH_NAME == 'master') {
          stage('Deploy on prod') {
            sh "/build-scripts/deploy_image.py -n prod -d bender-front bender-front=${imageTag}"

            sh '/build-scripts/bump-stable-tag.sh bender-front latest'
          }
        }
      }
    }
  }
}
