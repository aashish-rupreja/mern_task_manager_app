
pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '850870347008'
        ECR_BACKEND_REPO = 'mern-task-manager-backend'
        ECR_FRONTEND_REPO = 'mern-task-manager-frontend'
    }

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

        stage('Push Images to ECR') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'aws-ecr-credentials',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY'
                    )
                ]) {
                    sh '''
                        set -eu

                        REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

                        aws ecr get-login-password --region "$AWS_REGION" |
                            docker login --username AWS --password-stdin "$REGISTRY"

                        docker tag mern-task-manager-backend:latest \
                            "$REGISTRY/$ECR_BACKEND_REPO:latest"

                        docker tag mern-task-manager-frontend:latest \
                            "$REGISTRY/$ECR_FRONTEND_REPO:latest"

                        docker push "$REGISTRY/$ECR_BACKEND_REPO:latest"
                        docker push "$REGISTRY/$ECR_FRONTEND_REPO:latest"
                    '''
                }
            }
        }
    }
}
