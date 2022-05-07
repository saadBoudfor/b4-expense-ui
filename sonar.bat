call ng test --watch=false --code-coverage
@REM call sonar-scanner.bat -Dsonar.organization=saadboudfor -Dsonar.projectKey=b4_expenses_ui -Dsonar.sources=src -Dsonar.test.inclusions=**/*.spec.ts -Dsonar.host.url=https://sonarcloud.io -Dsonar.typescript.lcov.reportPaths=coverage/b4-b4-expenses-ui/lcov.info -Dsonar.exclusions=**/node_modules/**
sonar-scanner.bat -D"sonar.projectKey=expenses_ui" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.login=022708f3deb008c4dcef83b793aba6e01e0004db"
