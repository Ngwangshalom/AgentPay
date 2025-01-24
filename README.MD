
# Agent Pay - Open Source Repository

Agent Pay is a payment gateway service designed to load Whapple Pay users' accounts with cash. It allows agents to facilitate cash deposits, enabling users to top up their Whapple Pay wallets with ease. This repository is open-source and welcomes contributions to help improve the service and make it more robust for the community.

<p>
  <!-- iOS -->
  <a href="https://itunes.apple.com/app/apple-store/id982107779">
    <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  </a>
  <!-- Android -->
  <a href="https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=blankexample">
    <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />
  </a>
  <!-- Web -->
  <a href="https://docs.expo.dev/workflow/web/">
    <img alt="Supports Expo Web" longdesc="Supports Expo Web" src="https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff" />
  </a>
</p>

## 🚀 Features
- **Seamless cash deposits** for Whapple Pay users.
- **Agent system** where agents can deposit cash to users' wallets.
- **Transaction history**: Track and manage all deposits made through the system.
- **Cross-platform**: Supports iOS, Android, and Web clients.
- **Scalable**: Easily extendable and adaptable to future features.

## 📦 Installation

### Prerequisites
- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed.
- **Yarn**: Install dependencies using [Yarn](https://yarnpkg.com/) (or npm if preferred).

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Ngwangshalom/AgentPay.git
   cd AgentPay
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. If you’re working with native code, run:
   ```bash
   npx pod-install
   ```

4. Start the app:
   ```bash
   yarn start
   ```

5. Open the app on your desired platform:
   - **iOS**: Open the project in XCode for iOS development.
   - **Android**: Open in Android Studio for Android development.
   - **Web**: Access the app via a web browser.

## 🛠️ How Agent Pay Works
Agent Pay integrates seamlessly into Whapple Pay, providing agents the ability to deposit cash into users' accounts. With the Agent Pay system, agents can:
- Receive cash from customers
- Deposit it into the Whapple Pay system
- Track transactions and balances.

The platform uses a secure authentication system, ensuring that only authorized agents can perform deposits, and provides detailed reporting features.

## 💡 Contributing

We welcome contributions from the community! Here's how you can get involved:

1. **Fork the repository** to make your changes.
2. **Create a feature branch** for your work.
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and commit them.
   ```bash
   git commit -m "Add a new feature"
   ```
4. **Push your branch** to your fork.
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Submit a pull request** describing your changes and improvements.

### Contributions are highly encouraged! We need help in:
- Optimizing the deposit workflow.
- Enhancing security features.
- Extending the agent dashboard for better management.
- Improving the transaction tracking system.

## 🔧 Running Tests

We utilize Jest for unit testing. To run tests, use the following command:
```bash
yarn test
```

## 📄 Documentation

For detailed documentation on how to use Agent Pay or integrate it with other systems, visit the official [Whapple Pay documentation](https://whapplepay-docs.com).

## 📝 Notes
- Learn more about [Agent Pay](https://whapplepay-docs.com/agentpay).
- See what API and components are available for integration.
- You can find more about developing and deploying apps with [Expo](https://docs.expo.dev/).

## ⚠️ Open Issues and Areas for Improvement

We currently have some open issues that need attention, and we’d love to see contributions in the following areas:

### 1. UI Enhancements
- The user interface can be improved to provide a more **modern and intuitive experience**. Contributions to enhance the UI for both agents and users will be highly appreciated.

### 2. Security Enhancements
- While the current system is secure, **additional security checks** should be implemented, especially for handling sensitive user data and payment transactions. Contributions towards **encrypting sensitive data**, **validating agent authentication**, and **securing API calls** are encouraged.
  
  We also encourage implementing **two-factor authentication (2FA)** for agent logins, as well as other security practices that can help mitigate potential threats and vulnerabilities.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for being a part of the Agent Pay open-source community! Together, we can help revolutionize payments and make Whapple Pay more accessible to everyone.