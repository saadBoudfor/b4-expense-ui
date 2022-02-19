call ng test --watch=false --code-coverage

call sonar-scanner.bat -Dsonar.organization=saadboudfor -Dsonar.projectKey=b4_expenses_ui -Dsonar.sources=src -Dsonar.test.inclusions=**/*.spec.ts -Dsonar.host.url=https://sonarcloud.io -Dsonar.typescript.lcov.reportPaths=coverage/b4-b4-expenses-ui/lcov.info -Dsonar.exclusions=**/node_modules/**
