# 1. Clone repository
git clone https://github.com/akira3231/applyNote-main.git
cd applyNote

# 2. Verify Node.js installation
node --version  # Should show v14+
npm --version   # Should show v6+

# 3. Install all dependencies from package.json
npm install

# 4. Verify installation
npm list          # View installed packages
npm list --depth=0  # View top-level packages only

# 5. Create .env file for credentials
touch .env
# Edit .env and add:
# GMAIL_USER=your-email@gmail.com
# GMAIL_PASSWORD=your-app-password
# etc.

# 6. Run tests
npx cypress run

# 7. View test reports
allure generate allure-results --clean -o allure-report
allure open allure-report