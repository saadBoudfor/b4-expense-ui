@REM call ng test --watch=false --code-coverage
@REM call sonar-scanner.bat -Dsonar.organization=saadboudfor -Dsonar.projectKey=b4_expenses_ui -Dsonar.sources=src -Dsonar.test.inclusions=**/*.spec.ts -Dsonar.host.url=https://sonarcloud.io -Dsonar.typescript.lcov.reportPaths=coverage/b4-b4-expenses-ui/lcov.info -Dsonar.exclusions=**/node_modules/**
call sonar-scanner.bat -D"sonar.projectKey=b4_expenses_ui" -D"sonar.sources=." -D"sonar.host.url=http://localhost:9000" -D"sonar.login=625da1352b69b0ed6a70a015d6c6a5ec452e090b"
