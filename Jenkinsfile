pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *')
    }

    tools {
        nodejs 'node20'
    }

    environment {
        SELENIUM_URL = 'http://selenium:4444/wd/hub'
        APP_URL = 'http://jenkins:3000'
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm install'
            }
        }

        stage('Start App') {
            steps {
                sh 'node src/app.js > app.log 2>&1 &'
                sh 'sleep 5'
            }
        }

        stage('Test') {
            steps {
                sh 'node node_modules/jest/bin/jest.js'
            }
        }

        stage('UI Test') {
            steps {
                sh 'node node_modules/jest/bin/jest.js tests/e2e/home.test.js --runInBand --reporters=default --reporters=jest-junit'
            }
        }
    }

    post {
        always {
            junit 'junit.xml'
        }
    }
}