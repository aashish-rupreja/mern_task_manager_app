
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    sh 'npm ci'
                    sh 'npm test'
                }
            }
        }

        stage('Frontend Tests') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                    sh 'npm test'
                }
            }
        }

        stage('Frontend Quality Checks') {
            steps {
                dir('frontend') {
                    sh 'npm run lint'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t mern-task-manager-backend:latest ./backend'
                sh 'docker build -t mern-task-manager-frontend:latest ./frontend'
            }
        }

        stage('Trivy Security Scan') {
            steps {
                sh 'trivy image --severity HIGH,CRITICAL mern-task-manager-backend:latest'
                sh 'trivy image --severity HIGH,CRITICAL mern-task-manager-frontend:latest'
            }
        }
    }
}
