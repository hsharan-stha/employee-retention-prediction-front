pipeline {
    agent any
    tools {
        nodejs 'N16'
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Stop and remove existing container (if exists)
                    sh 'docker stop employee-retention-frontend || true'
                    sh 'docker rm employee-retention-frontend || true'

                    // Remove existing image (if exists)
                    sh 'docker rmi employee-retention/frontend-employee-retention:0.0.1 || true'

                    // Build Docker image
                    sh 'docker buildx build --platform linux/amd64 -t employee-retention/frontend-employee-retention:0.0.1 .'

                    // Run Docker container
                    sh 'docker run --name employee-retention-frontend -d -p 83:83 employee-retention/frontend-employee-retention:0.0.1'
            }
        }
    }
}